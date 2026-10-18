"use client";

import { useId } from "react";
import type { FlagLevel, VelocityQuadrant, VelocitySummary } from "./types";

const color: Record<VelocityQuadrant, string> = {
  long_term_hold: "#34d399",
  diamond_hands: "#38bdf8",
  active_trading: "#a3a3a3",
  fast_flip: "#fbbf24",
  wash_suspect: "#f87171",
};

export interface ScatterPanelsProps {
  summary: VelocitySummary;
  className?: string;
}

export function VelocityScatterSvg({ summary, className = "" }: ScatterPanelsProps) {
  const headingId = useId();
  const maxHold = Math.max(30, ...summary.points.map((p) => p.holdDays));
  const maxVel = Math.max(5, ...summary.points.map((p) => p.velocityPer30d));
  const w = 480;
  const h = 320;
  const pad = 36;

  return (
    <section
      className={`rounded-2xl border border-white/10 bg-black/30 p-4 ${className}`}
      aria-labelledby={headingId}
    >
      <h3 id={headingId} className="text-sm text-white/70 mb-2">
        Hold days (x) vs velocity / 30d (y)
      </h3>
      <svg viewBox={`0 0 ${w} ${h}`} className="w-full h-auto" role="img">
        <title>Collection velocity scatter</title>
        <rect x={0} y={0} width={w} height={h} fill="#0a0a0a" />
        {/* axes */}
        <line
          x1={pad}
          y1={h - pad}
          x2={w - 12}
          y2={h - pad}
          stroke="#525252"
          strokeWidth={1}
        />
        <line
          x1={pad}
          y1={12}
          x2={pad}
          y2={h - pad}
          stroke="#525252"
          strokeWidth={1}
        />
        {summary.points.map((p) => {
          const x = pad + (p.holdDays / maxHold) * (w - pad - 16);
          const y = h - pad - (p.velocityPer30d / maxVel) * (h - pad - 16);
          return (
            <circle
              key={p.id}
              cx={x}
              cy={y}
              r={6}
              fill={color[p.quadrant]}
              opacity={0.9}
            >
              <title>
                {p.name}: hold {p.holdDays}d, vel {p.velocityPer30d}, {p.quadrant}
              </title>
            </circle>
          );
        })}
      </svg>
      <ul className="mt-3 flex flex-wrap gap-3 text-[10px] text-white/60">
        {(Object.keys(color) as VelocityQuadrant[]).map((q) => (
          <li key={q} className="flex items-center gap-1">
            <span
              className="inline-block w-2 h-2 rounded-full"
              style={{ background: color[q] }}
            />
            {q}
          </li>
        ))}
      </ul>
    </section>
  );
}

export function VelocityCounts({ summary, className = "" }: ScatterPanelsProps) {
  const headingId = useId();
  return (
    <section
      className={`rounded-2xl border border-white/10 bg-black/20 p-6 ${className}`}
      aria-labelledby={headingId}
    >
      <h3 id={headingId} className="font-semibold text-lg mb-4">
        Quadrant counts
      </h3>
      <dl className="space-y-2 text-sm">
        {Object.entries(summary.counts).map(([k, v]) => (
          <div key={k} className="flex justify-between border-b border-white/5 pb-2">
            <dt className="text-white/50 font-mono text-xs">{k}</dt>
            <dd className="font-mono">{v}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}

const levelClass: Record<FlagLevel, string> = {
  info: "border-white/10 bg-white/5 text-white/80",
  warn: "border-amber-500/30 bg-amber-500/10 text-amber-100",
  alert: "border-red-500/30 bg-red-500/10 text-red-100",
};

export function VelocityFlags({ summary, className = "" }: ScatterPanelsProps) {
  const headingId = useId();
  return (
    <section
      className={`rounded-2xl border border-white/10 bg-black/20 p-6 ${className}`}
      aria-labelledby={headingId}
    >
      <h3 id={headingId} className="font-semibold text-lg mb-4">
        Flags
      </h3>
      <ul className="space-y-3">
        {summary.flags.map((f) => (
          <li key={f.id} className={`rounded-xl border p-3 text-sm ${levelClass[f.level]}`}>
            <p className="font-medium">{f.message}</p>
            <p className="text-xs opacity-60 mt-1">
              {f.level} · {f.trigger}
            </p>
          </li>
        ))}
      </ul>
    </section>
  );
}
