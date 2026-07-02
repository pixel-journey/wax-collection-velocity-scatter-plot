'use client';

import React, { useState } from 'react';

export default function CollectionVelocityScatterPlot() {
  const [collection, setCollection] = useState('PixelJourney');
  const [data, setData] = useState<any>(null);

  const analyze = () => {
    // Mock scatter data for demo
    const points = Array.from({ length: 25 }, (_, i) => ({
      id: i,
      holdTime: Math.random() * 180 + 10,
      velocity: Math.random() * 12 + 0.5,
      name: `Template ${i + 1}`,
    }));
    setData({ points, collection });
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white p-6">
      <div className="max-w-5xl mx-auto">
        <div className="font-press-start text-2xl tracking-widest text-emerald-400 mb-2">COLLECTION VELOCITY SCATTER PLOT</div>
        <div className="text-xs opacity-60 mb-8">Pixel Journey • Holder Behavior • Quadrant Analysis</div>

        <div className="glassmorphic-crt pixel-border p-6 rounded-2xl mb-6">
          <div className="flex gap-3 mb-6">
            <input
              value={collection}
              onChange={e => setCollection(e.target.value)}
              className="flex-1 bg-black/60 border border-white/10 px-4 py-3 rounded-xl font-mono text-sm"
            />
            <button onClick={analyze} className="px-8 py-3 bg-emerald-600 rounded-2xl">Analyze Collection</button>
          </div>

          {data && (
            <div>
              <div className="text-sm mb-3 opacity-70">Holding Duration vs Trade Velocity (Demo)</div>
              <div className="bg-black/60 p-8 rounded-xl min-h-[380px] flex items-center justify-center">
                <div className="text-center w-full">
                  <div className="grid grid-cols-2 gap-4 text-xs mb-6">
                    <div className="p-3 border border-emerald-400/30 rounded">Safe Long-term Holders<br /><span className="opacity-60">High hold time, low velocity</span></div>
                    <div className="p-3 border border-amber-400/30 rounded">Speculative Flippers<br /><span className="opacity-60">Low hold time, high velocity</span></div>
                    <div className="p-3 border border-red-400/30 rounded">Wash Trading Zone<br /><span className="opacity-60">Very high velocity, suspicious loops</span></div>
                    <div className="p-3 border border-sky-400/30 rounded">Diamond Hands<br /><span className="opacity-60">Very high hold time</span></div>
                  </div>
                  <div className="text-xs opacity-60">Interactive scatter plot would render here with clickable points</div>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="text-xs opacity-70">
          In production, this fetches real sales history from AtomicMarket and renders an interactive scatter plot with automated quadrant classification and wash trading detection.
        </div>
      </div>
    </div>
  );
}
