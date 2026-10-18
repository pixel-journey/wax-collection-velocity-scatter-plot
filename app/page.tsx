'use client';

import React, { useCallback, useMemo, useState } from 'react';
import { classifyCollection, demoVelocityPoints } from '../examples/engines';
import { fetchVelocityPoints } from '../examples/live/atomicmarket';
import type { VelocitySummary } from '../examples/types';

type Mode = 'live' | 'demo';

const colors: Record<string, string> = {
  long_term_hold: '#34d399',
  diamond_hands: '#38bdf8',
  active_trading: '#a3a3a3',
  fast_flip: '#fbbf24',
  wash_suspect: '#f87171',
};

export default function CollectionVelocityScatterPlot() {
  const [mode, setMode] = useState<Mode>('live');
  const [collection, setCollection] = useState('pixeljourney');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [liveSummary, setLiveSummary] = useState<VelocitySummary | null>(null);
  const [meta, setMeta] = useState<string | null>(null);

  const demoSummary = useMemo(
    () => classifyCollection(demoVelocityPoints()),
    []
  );
  const summary = mode === 'live' ? liveSummary : demoSummary;

  const maxHold = Math.max(
    30,
    ...(summary?.points.map((p) => p.holdDays) ?? [30])
  );
  const maxVel = Math.max(
    5,
    ...(summary?.points.map((p) => p.velocityPer30d) ?? [5])
  );
  const w = 480;
  const h = 280;
  const pad = 32;

  const runLive = useCallback(async () => {
    setLoading(true);
    setError(null);
    setMeta(null);
    try {
      const { points, source, note } = await fetchVelocityPoints({
        limit: 100,
        collection: collection.trim() || undefined,
      });
      if (points.length === 0) {
        setError('No template sales in sample.');
        setLiveSummary(null);
        return;
      }
      setLiveSummary(classifyCollection(points));
      setMeta(`${points.length} templates · ${note} · ${source}`);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Live fetch failed');
      setLiveSummary(null);
    } finally {
      setLoading(false);
    }
  }, [collection]);

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white p-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-2xl tracking-widest text-emerald-400 mb-2 font-bold">
          COLLECTION VELOCITY SCATTER
        </div>
        <div className="text-xs opacity-60 mb-6">
          Pixel Journey · Live AtomicMarket sample or demo · Soft wash signals
        </div>

        <div className="flex flex-wrap gap-2 mb-4">
          <button
            type="button"
            onClick={() => setMode('live')}
            className={`px-4 py-2 rounded-xl text-sm ${
              mode === 'live' ? 'bg-sky-600' : 'bg-white/10'
            }`}
          >
            Live market
          </button>
          <button
            type="button"
            onClick={() => setMode('demo')}
            className={`px-4 py-2 rounded-xl text-sm ${
              mode === 'demo' ? 'bg-emerald-600' : 'bg-white/10'
            }`}
          >
            Demo
          </button>
        </div>

        {mode === 'live' && (
          <div className="border border-white/10 bg-black/40 p-4 rounded-2xl mb-6 flex flex-col sm:flex-row gap-3">
            <input
              value={collection}
              onChange={(e) => setCollection(e.target.value)}
              className="flex-1 bg-black/60 border border-white/10 px-4 py-3 rounded-xl font-mono text-sm"
              placeholder="collection_name (optional)"
            />
            <button
              type="button"
              onClick={runLive}
              disabled={loading}
              className="px-6 py-3 rounded-xl bg-sky-600 text-sm font-medium disabled:opacity-50"
            >
              {loading ? 'Fetching…' : 'Analyze live'}
            </button>
          </div>
        )}

        {error && (
          <div className="mb-4 text-sm text-red-400 border border-red-500/30 rounded-xl p-3">
            {error}
          </div>
        )}
        {meta && (
          <div className="mb-4 text-xs opacity-50 break-all">{meta}</div>
        )}

        {summary && (
          <div className="border border-white/10 bg-black/40 p-6 rounded-2xl mb-6">
            <svg viewBox={`0 0 ${w} ${h}`} className="w-full h-auto">
              <rect width={w} height={h} fill="#050505" />
              <line
                x1={pad}
                y1={h - pad}
                x2={w - 8}
                y2={h - pad}
                stroke="#444"
              />
              <line x1={pad} y1={8} x2={pad} y2={h - pad} stroke="#444" />
              {summary.points.map((p) => {
                const x = pad + (p.holdDays / maxHold) * (w - pad - 12);
                const y =
                  h - pad - (p.velocityPer30d / maxVel) * (h - pad - 12);
                return (
                  <circle
                    key={p.id}
                    cx={x}
                    cy={y}
                    r={6}
                    fill={colors[p.quadrant] ?? '#fff'}
                  >
                    <title>
                      {p.name}: {p.holdDays}d / {p.velocityPer30d} ·{' '}
                      {p.quadrant}
                    </title>
                  </circle>
                );
              })}
            </svg>

            <div className="grid grid-cols-2 md:grid-cols-5 gap-2 mt-4 text-[10px]">
              {Object.entries(summary.counts).map(([k, v]) => (
                <div key={k} className="border border-white/10 rounded p-2">
                  <div className="opacity-50">{k}</div>
                  <div className="font-mono text-sm">{v}</div>
                </div>
              ))}
            </div>

            <ul className="mt-4 space-y-1 text-xs opacity-80">
              {summary.flags.map((f) => (
                <li key={f.id}>
                  [{f.level}] {f.message}
                </li>
              ))}
            </ul>
          </div>
        )}

        {!summary && mode === 'live' && !loading && !error && (
          <p className="text-sm opacity-50 mb-6">
            Load recent sold sales (optionally filtered by collection).
          </p>
        )}

        <p className="text-xs opacity-60">
          Live: AtomicMarket sales → median gap + sample velocity →{' '}
          <code className="text-emerald-400/80">classifyCollection</code>. Soft
          sample only.
        </p>
      </div>
    </div>
  );
}
