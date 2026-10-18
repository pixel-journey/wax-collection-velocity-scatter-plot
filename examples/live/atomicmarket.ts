/**
 * Live AtomicMarket adapter → TemplateVelocityPoint.
 * Soft aggregates from recent sold listings — not full hold-time truth.
 */

import type { TemplateVelocityPoint } from "../types";

export const DEFAULT_ATOMIC = "https://wax.api.atomicassets.io";

interface AtomicSale {
  sale_id?: string;
  seller?: string;
  buyer?: string;
  updated_at_time?: string;
  created_at_time?: string;
  assets?: {
    template?: { template_id?: string | number; name?: string };
    name?: string;
    collection?: { collection_name?: string };
  }[];
}

interface AtomicSalesResponse {
  data?: AtomicSale[];
}

function saleTimeSec(s: AtomicSale): number {
  const raw = s.updated_at_time || s.created_at_time;
  if (!raw) return 0;
  const n = Number(raw);
  if (!Number.isFinite(n)) return 0;
  return Math.floor(n > 1e12 ? n / 1000 : n);
}

export async function fetchSoldSales(
  options: {
    atomicBase?: string;
    collection?: string;
    limit?: number;
    signal?: AbortSignal;
  } = {}
): Promise<{ sales: AtomicSale[]; source: string }> {
  const base = (options.atomicBase || DEFAULT_ATOMIC).replace(/\/$/, "");
  const limit = options.limit ?? 100;
  const params = new URLSearchParams({
    state: "3",
    limit: String(limit),
    order: "desc",
    sort: "updated",
  });
  if (options.collection) params.set("collection_name", options.collection);

  const url = `${base}/atomicmarket/v1/sales?${params}`;
  const res = await fetch(url, {
    signal: options.signal,
    headers: { Accept: "application/json" },
  });
  if (!res.ok) throw new Error(`AtomicMarket ${res.status}: ${res.statusText}`);
  const json = (await res.json()) as AtomicSalesResponse;
  return { sales: json.data ?? [], source: url };
}

/**
 * Group sales by template_id. Velocity = count in window (proxied as sales in sample).
 * Hold days: soft proxy from inter-sale gaps on same template (median gap / 86400).
 */
export function salesToVelocityPoints(
  sales: AtomicSale[],
  windowDays = 30
): TemplateVelocityPoint[] {
  type Bucket = { name: string; times: number[] };
  const map = new Map<string, Bucket>();

  for (const s of sales) {
    const asset = s.assets?.[0];
    const tid = asset?.template?.template_id;
    if (tid == null) continue;
    const id = String(tid);
    const name =
      asset.template?.name || asset.name || `template ${id}`;
    const t = saleTimeSec(s);
    if (!t) continue;
    const b = map.get(id) ?? { name, times: [] };
    b.times.push(t);
    map.set(id, b);
  }

  const points: TemplateVelocityPoint[] = [];
  for (const [id, b] of map) {
    b.times.sort((a, c) => a - c);
    const count = b.times.length;
    // Scale sample count toward "per 30d" assuming sample ~ recent window
    const velocityPer30d = count;

    let holdDays = windowDays;
    if (count >= 2) {
      const gaps: number[] = [];
      for (let i = 1; i < b.times.length; i++) {
        gaps.push((b.times[i] - b.times[i - 1]) / 86400);
      }
      gaps.sort((a, c) => a - c);
      holdDays = gaps[Math.floor(gaps.length / 2)] || windowDays;
    }

    points.push({
      id,
      name: b.name,
      holdDays: Math.max(0.1, Math.round(holdDays * 10) / 10),
      velocityPer30d,
      suspectedWash: count >= 8 && holdDays <= 3,
    });
  }

  return points;
}

export async function fetchVelocityPoints(
  options: {
    atomicBase?: string;
    collection?: string;
    limit?: number;
    signal?: AbortSignal;
  } = {}
): Promise<{ points: TemplateVelocityPoint[]; source: string; note: string }> {
  const { sales, source } = await fetchSoldSales(options);
  const points = salesToVelocityPoints(sales);
  return {
    points,
    source,
    note:
      "Hold = median inter-sale gap on template; velocity = sales in sample. Soft sample only.",
  };
}
