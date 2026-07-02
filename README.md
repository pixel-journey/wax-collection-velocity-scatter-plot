# wax-collection-velocity-scatter-plot

**Collection Velocity Scatter Plot**

An interactive scatter plot that charts NFT templates within a WAX collection by holding duration vs trade frequency. Automatically identifies quadrants for safe long-term storage vs high-risk speculative flipping and wash trading zones.

**Status:** 🔒 Private (In Development) | Target: Public when v1 complete  
**Category:** Market & Valuation Analytics  
**Parent Catalog:** [pixel-journey/wax-ecosystem-blueprint-catalog](https://github.com/pixel-journey/wax-ecosystem-blueprint-catalog)

> Built to the same high standard of educational excellence, production readiness, and WAX best practices as the [gkniftyheads-tracker](https://github.com/henrikpiga/gkniftyheads-tracker).

---

## Quick Start

```bash
git clone https://github.com/pixel-journey/wax-collection-velocity-scatter-plot.git
cd wax-collection-velocity-scatter-plot
npm install
npm run dev
```

Select a collection in the demo to instantly see the interactive scatter plot with quadrant analysis and outlier flagging.

---

## Why This Blueprint?

Collections struggle to distinguish genuine long-term collectors from speculative flippers and wash traders who artificially inflate metrics. This visual tool makes those behaviors immediately visible through data-driven quadrants and automated detection of manipulation loops.

---

## Architecture & Data Flow

```
Select Collection
       ↓
Fetch Sales History + Mint Data (AtomicMarket + AtomicAssets)
       ↓
Calculate per-template metrics
  - Avg hold time before listing
  - Trade frequency / velocity
       ↓
Client-side Quadrant Classification + Outlier Detection
       ↓
Interactive Scatter Plot (ApexCharts / Chart.js)
  - Color-coded quadrants
  - Clickable templates with details
  - Wash trading loop highlighting
```

All analysis is client-side after data fetch for transparency and performance.

---

## Complete Repository Structure

Follows Pixel Journey high standards.

Key parts:
- `app/` — Main scatter interface
- `components/` — VelocityScatter, QuadrantLegend, OutlierTable, TemplateDetailModal
- `hooks/` — useCollectionVelocity, useQuadrantAnalysis
- `lib/wax/` — sales-history-aggregator.ts, velocity-calculator.ts, wash-trading-detector.ts
- `public/mock-data/` — Sample collection datasets with known behaviors
- `.github/workflows/` — CI automation

Detailed comments on metric calculations and manipulation detection logic.

---

## Key WAX Concepts Explained

- **AtomicMarket Sales History**: Querying historical sales to calculate real holding and trading behavior.
- **Template-level Analysis**: Moving beyond collection-wide stats to individual template performance.
- **Wash Trading Detection**: Client-side identification of same-address cycling patterns.
- **Public APIs**: Using AtomicMarket and AtomicAssets endpoints efficiently with caching.

This is **WAX-primary**. The scatter visualization and quadrant analysis pattern works on any chain with similar marketplace history data.

---

## Design Specifications

- Clean, modern scatter plot with intuitive quadrant coloring
- Interactive points with rich tooltips and detail modals
- Clear legend explaining each quadrant’s meaning
- Responsive design
- Accessible (color-blind safe, keyboard navigation, screen reader support for tables)

Aligned with Pixel Journey Design System.

---

## Technical Architecture & Best Practices

- **Stack**: Next.js 15, TypeScript, Tailwind + shadcn/ui, ApexCharts or Chart.js
- **Data**: AtomicMarket sales history + AtomicAssets mint data with efficient aggregation
- **Performance**: Client-side calculations with React Query caching; virtualization for large collections
- **Demo Mode**: Full interactive scatter with pre-loaded realistic datasets
- **Live Mode**: Analyze any public WAX collection

See catalog standards for WAX rate limiting and public endpoint best practices.

---

## Demo & Usage

- Explore pre-loaded collections with known behaviors
- Select any collection to analyze
- Hover/click points for template details and trade history
- Filter by quadrant or flag wash trading suspects
- Export charts or flagged lists

Designed for immediate insight.

---

## Customization

- Adjust quadrant thresholds and velocity calculations
- Add custom flags for specific manipulation patterns
- Integrate with other market analytics tools in the catalog
- Customize visuals and branding per project

---

## Roadmap

- v1: Core scatter plot + quadrant analysis + wash trading detection + demo
- v1.1: Advanced filtering, exports, and collection comparison
- Future: Integration with royalty leakage and loyalty tools

---

## Contributing & Credits

Built with care for transparent marketplace analytics on WAX.

MIT License.

Following the production-quality educational standards from the gkniftyheads-tracker.

---

*Pixel Journey — Making Web3 interfaces pixel-perfect and delightful.*