/**
 * Pure engines for collection velocity quadrant classification.
 * Heuristic only — wash labels are soft signals.
 */

import type {
  ClassifiedPoint,
  TemplateVelocityPoint,
  VelocityFlag,
  VelocityQuadrant,
  VelocitySummary,
  VelocityThresholds,
} from "./types";

export const DEFAULT_THRESHOLDS: VelocityThresholds = {
  holdHighDays: 60,
  holdLowDays: 14,
  velocityHigh: 4,
  velocityWash: 10,
};

export function classifyPoint(
  p: TemplateVelocityPoint,
  t: VelocityThresholds = DEFAULT_THRESHOLDS
): ClassifiedPoint {
  const wash =
    p.suspectedWash ||
    (p.velocityPer30d >= t.velocityWash && p.holdDays <= t.holdLowDays);

  let quadrant: VelocityQuadrant;
  if (wash) {
    quadrant = "wash_suspect";
  } else if (p.holdDays >= t.holdHighDays * 1.5 && p.velocityPer30d < t.velocityHigh) {
    quadrant = "diamond_hands";
  } else if (p.holdDays >= t.holdHighDays && p.velocityPer30d < t.velocityHigh) {
    quadrant = "long_term_hold";
  } else if (p.holdDays < t.holdLowDays && p.velocityPer30d >= t.velocityHigh) {
    quadrant = "fast_flip";
  } else {
    quadrant = "active_trading";
  }

  return { ...p, quadrant };
}

export function classifyCollection(
  points: TemplateVelocityPoint[],
  thresholds: VelocityThresholds = DEFAULT_THRESHOLDS
): VelocitySummary {
  const classified = points.map((p) => classifyPoint(p, thresholds));
  const counts: Record<VelocityQuadrant, number> = {
    long_term_hold: 0,
    diamond_hands: 0,
    active_trading: 0,
    fast_flip: 0,
    wash_suspect: 0,
  };
  for (const p of classified) counts[p.quadrant] += 1;

  return {
    points: classified,
    counts,
    flags: buildVelocityFlags(classified, counts),
  };
}

export function buildVelocityFlags(
  points: ClassifiedPoint[],
  counts: Record<VelocityQuadrant, number>
): VelocityFlag[] {
  const flags: VelocityFlag[] = [];
  const n = points.length;

  if (n < 5) {
    flags.push({
      id: "small-sample",
      level: "warn",
      message: "Few templates — quadrant mix is weak evidence.",
      trigger: "sampleSize",
    });
  }

  if (n > 0 && counts.wash_suspect / n >= 0.2) {
    flags.push({
      id: "wash-share",
      level: "alert",
      message: `≥20% of points classified wash_suspect (${counts.wash_suspect}/${n}). Investigate sale loops — not automatic proof of manipulation.`,
      trigger: "wash_suspect ratio",
    });
  }

  if (n > 0 && counts.fast_flip / n >= 0.4) {
    flags.push({
      id: "flip-heavy",
      level: "warn",
      message: "High share of fast-flip templates — speculative turnover dominates.",
      trigger: "fast_flip ratio",
    });
  }

  if (n > 0 && (counts.long_term_hold + counts.diamond_hands) / n >= 0.5) {
    flags.push({
      id: "holder-heavy",
      level: "info",
      message: "Majority long-hold oriented under these thresholds.",
      trigger: "hold quadrants",
    });
  }

  if (flags.length === 0) {
    flags.push({
      id: "neutral",
      level: "info",
      message: "No strong concentration flags. Tune thresholds for the collection’s market.",
      trigger: "overall",
    });
  }

  return flags;
}

/** Deterministic demo set (no Math.random). */
export function demoVelocityPoints(): TemplateVelocityPoint[] {
  return [
    { id: "1", name: "Genesis Common", holdDays: 120, velocityPer30d: 0.8 },
    { id: "2", name: "Genesis Rare", holdDays: 200, velocityPer30d: 0.3 },
    { id: "3", name: "Season Pass", holdDays: 45, velocityPer30d: 2.5 },
    { id: "4", name: "Promo Sticker", holdDays: 5, velocityPer30d: 14, suspectedWash: true },
    { id: "5", name: "Craft Part A", holdDays: 8, velocityPer30d: 7 },
    { id: "6", name: "Craft Part B", holdDays: 9, velocityPer30d: 6.5 },
    { id: "7", name: "Art Edition", holdDays: 90, velocityPer30d: 1.2 },
    { id: "8", name: "Quest Badge", holdDays: 30, velocityPer30d: 3.5 },
    { id: "9", name: "Loop Template", holdDays: 3, velocityPer30d: 18 },
    { id: "10", name: "Founder Key", holdDays: 400, velocityPer30d: 0.1 },
  ];
}
