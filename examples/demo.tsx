"use client";

import { useMemo } from "react";
import { classifyCollection, demoVelocityPoints } from "./engines";
import {
  VelocityCounts,
  VelocityFlags,
  VelocityScatterSvg,
} from "./ScatterPanels";

export default function VelocityScatterDemo() {
  const summary = useMemo(
    () => classifyCollection(demoVelocityPoints()),
    []
  );

  return (
    <div className="mx-auto max-w-4xl space-y-8 p-6">
      <header className="space-y-2">
        <p className="text-sm font-medium uppercase tracking-wider text-emerald-400/80">
          Pixel Journey · Market analytics
        </p>
        <h1 className="text-2xl font-bold text-white">
          Collection Velocity Scatter
        </h1>
        <p className="text-sm text-white/60 max-w-2xl">
          Deterministic demo points classified into hold vs flip quadrants.
          Production should compute holdDays and velocity from AtomicMarket sales.
        </p>
      </header>

      <VelocityScatterSvg summary={summary} />
      <div className="grid gap-6 md:grid-cols-2">
        <VelocityCounts summary={summary} />
        <VelocityFlags summary={summary} />
      </div>
    </div>
  );
}
