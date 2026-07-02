# wax-collection-velocity-scatter-plot — Collection Velocity Scatter Plot

> **Status:** ✅ **FULL PX PERFECTION (Alpha-Ready)** | July 2026  
> **Category:** Market & Valuation Analytics  
> **Parent Catalog:** [pixel-journey/wax-ecosystem-blueprint-catalog](https://github.com/pixel-journey/wax-ecosystem-blueprint-catalog)
> **Benchmark:** gkniftyheads-tracker + Pixel Journey PX Perfection Standard v1.0

**Goal:** An interactive scatter plot that charts NFT templates within a WAX collection by holding duration vs trade frequency. Automatically identifies quadrants for safe long-term storage vs high-risk speculative flipping and wash trading zones.

---

## Educational Core (Why This Exists)

Collections often struggle to distinguish genuine long-term collectors from speculative flippers and wash traders who artificially inflate metrics. This visual tool makes those behaviors immediately visible through data-driven quadrants and automated detection of manipulation.

**Common Pitfalls This Tool Addresses**:
- Judging collection health by volume alone without understanding holder behavior
- Missing wash trading loops that distort perceived demand
- Overwhelming stakeholders with raw sales data instead of clear insights
- Making airdrop or partnership decisions without behavioral context

**Learning Outcomes**:
After studying this blueprint, you should be able to:
- Calculate and interpret holding duration vs velocity metrics
- Build interactive scatter visualizations with quadrant classification
- Detect wash trading patterns client-side
- Design market analytics tools that surface manipulation risks

---

## Tech Recommendations Matrix

| Component             | Recommended                     | Alternative              | Why Chosen                                           | When to Choose Alternative          |
|-----------------------|---------------------------------|--------------------------|------------------------------------------------------|-------------------------------------|
| Visualization         | Scatter plot (Chart.js / Recharts) | D3 scatter             | Good balance of features and development speed       | When you need maximum visual control |
| Data Source           | AtomicMarket + AtomicAssets     | Third-party indexer      | Direct, trustworthy, production-ready on WAX         | When you need deeper historical joins |
| Wash Trading Detection| Client-side pattern matching    | Server-side ML           | Transparent, auditable, educational                  | When you need complex pattern recognition |

---

## Machine-Optimized Spec (spec.yaml)

```yaml
blueprint:
  id: wax-collection-velocity-scatter-plot
  tier: market-analytics
  status: alpha-ready
  benchmark_target: PX-Perfection-Standard-v1.0

features:
  - holding_duration_vs_velocity_scatter
  - quadrant_classification
  - wash_trading_detection
  - interactive_template_explorer

recommended_stack:
  viz: Scatter plot (Chart.js / Recharts)
  data: AtomicMarket + AtomicAssets
  detection: client_side_pattern_matching

machine_instructions:
  - "Build interactive scatter plot for collection velocity analysis"
  - "Implement quadrant classification and wash trading detection"
  - "Create clear visual dashboard with template drill-down"
  - "Add educational explanations of holder behavior metrics"
```

---

## Ecosystem Synergy

This tool pairs extremely well with:
- `wax-collection-holder-overlap-cluster` — Combine velocity with audience overlap
- `wax-account-sybil-distance-scorer` — Cross-reference with Sybil signals
- `wax-defi-loyalty-health-scorecard` — Add loyalty context to trading behavior
- Future royalty leakage and market health tools

It establishes a reusable market analytics pattern.

---

## Implementation Highlights

Full production code committed with:
- Interactive scatter plot with quadrant coloring
- Holding duration vs trade frequency calculation
- Wash trading detection
- Template detail modals
- Demo mode with realistic datasets

---

## How to Run
```bash
git clone https://github.com/pixel-journey/wax-collection-velocity-scatter-plot.git
npm install
npm run dev
```

Explore holder behavior across any WAX collection.

---

## PX Perfection Alignment

This implementation targets:
- Educational Depth: Strong explanations + learning outcomes
- Documentation Layers: Excellent README + spec.yaml + ecosystem links
- Machine Readiness: Detailed spec.yaml with AI instructions
- Visual Design: Clean scatter plot with retro pixel polish
- Ecosystem Synergy: Explicit companion relationships documented

Future iterations will add advanced filtering, export features, and deeper integration examples.

*Pixel Journey — Raising the bar for market analytics tooling.*
