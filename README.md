# wax-collection-velocity-scatter-plot

> **Status:** 🔄 Deep Refinement (PX Perfection Standard v1.1)  
> **Category:** Market analytics  
> **Parent Catalog:** [wax-ecosystem-blueprint-catalog](https://github.com/pixel-journey/wax-ecosystem-blueprint-catalog)

**Goal:** Classify collection templates by **hold duration vs trade velocity** into transparent quadrants, with soft **wash-suspect** flags. Educational scatter pipeline — not a marketplace accusation engine.

The course is [EDUCATION.md](./EDUCATION.md). `npm test` locks the default edges: hold 90 and velocity 3 is `diamond_hands`, hold 14 and velocity 10 is `wash_suspect`. The numbers are arguments. No market is scanned.

---

## Honesty note

Prior UI used `Math.random()` points and a “scatter would render here” placeholder under a full-perfection claim. Core logic is now pure classification + SVG scatter in `/examples`.

---

## Quick Start

```ts
import { classifyCollection } from "./examples/engines";

const summary = classifyCollection([
  { id: "1", name: "T", holdDays: 90, velocityPer30d: 1.2 },
]);
```

Production: compute `holdDays` / `velocityPer30d` from AtomicMarket sales history.

---

## Quadrants (default thresholds)

| Quadrant | Rough meaning |
|----------|----------------|
| `diamond_hands` / `long_term_hold` | High hold, low velocity |
| `active_trading` | Middle band |
| `fast_flip` | Low hold, high velocity |
| `wash_suspect` | Extreme velocity + short hold (or upstream flag) |

Wash labels are **soft**. Circular trades need ledger-level confirmation.

---

## Architecture

```
TemplateVelocityPoint[] → classifyCollection → SVG / counts / flags
```

---

## License

MIT — **Pixel Journey**

*Last major refinement: October 2026*
