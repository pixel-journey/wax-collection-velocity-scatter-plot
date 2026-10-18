/**
 * Types for hold-duration vs trade-velocity analysis.
 * Units are educational defaults — production maps market sales history.
 */

export interface TemplateVelocityPoint {
  id: string;
  name: string;
  /** Average hold time in days before next sale (or still held) */
  holdDays: number;
  /** Sales count per 30 days (or similar velocity unit) */
  velocityPer30d: number;
  /** Optional flag from upstream wash heuristics */
  suspectedWash?: boolean;
}

export type VelocityQuadrant =
  | "long_term_hold"
  | "diamond_hands"
  | "active_trading"
  | "fast_flip"
  | "wash_suspect";

export interface ClassifiedPoint extends TemplateVelocityPoint {
  quadrant: VelocityQuadrant;
}

export interface VelocityThresholds {
  /** Hold days above → long-term / diamond */
  holdHighDays: number;
  /** Hold days below → flip-oriented */
  holdLowDays: number;
  /** Velocity above → active / flip */
  velocityHigh: number;
  /** Extreme velocity → wash suspect when combined with low hold */
  velocityWash: number;
}

export interface VelocitySummary {
  points: ClassifiedPoint[];
  counts: Record<VelocityQuadrant, number>;
  flags: VelocityFlag[];
}

export type FlagLevel = "info" | "warn" | "alert";

export interface VelocityFlag {
  id: string;
  level: FlagLevel;
  message: string;
  trigger: string;
}
