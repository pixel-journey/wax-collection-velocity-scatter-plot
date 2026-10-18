'use client';

import React, { useMemo } from 'react';
import { classifyCollection, demoVelocityPoints } from '../examples/engines';

const colors: Record<string, string> = {
  long_term_hold: '#34d399',
  diamond_hands: '#38bdf8',
  active_trading: '#a3a3a3',
  fast_flip: '#fbbf24',
  wash_suspect: '#f87171',
};

export default function CollectionVelocityScatterPlot() {
  const summary = useMemo(() => classifyCollection(demoVelocityPoints()), []);
  const maxHold = Math.max(30, ...summary.points.map((p) => p.holdDays));
  const maxVel = Math.max(5, ...summary.points.map((p) => p.velocityPer30d));
  const w = 480;
  const h = 280;
  const pad = 32;

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white p-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-2xl tracking-widest text-emerald-400 mb-2 font-bold">
          COLLECTION VELOCITY SCATTER
        </div>
        <div className="text-xs opacity-60 mb-6">
          Pixel Journey · Hold vs velocity · Soft wash signals only
        </div>

        <div className="border border-white/10 bg-black/40 p-6 rounded-2xl mb-6">
          <svg viewBox={`0 0 ${w} ${h}`} className="w-full h-auto">
            <rect width={w} height={h} fill="#050505" />
            <line x1={pad} y1={h - pad} x2={w - 8} y2={h - pad} stroke="#444" />
            <line x1={pad} y1={8} x2={pad} y2={h - pad} stroke="#444" />
            {summary.points.map((p) => {
              const x = pad + (p.holdDays / maxHold) * (w - pad - 12);
              const y = h - pad - (p.velocityPer30d / maxVel) * (h - pad - 12);
              return (
                <circle
                  key={p.id}
                  cx={x}
                  cy={y}
                  r={6}
                  fill={colors[p.quadrant] ?? '#fff'}
                >
                  <title>
                    {p.name}: {p.holdDays}d / {p.velocityPer30d} · {p.quadrant}
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

        <p className="text-xs opacity-60">
          Demo uses deterministic template metrics. Production should derive hold and
          velocity from AtomicMarket history via{" "}
          <code className="text-emerald-400/80">classifyCollection</code>.
        </p>
      </div>
    </div>
  );
}
