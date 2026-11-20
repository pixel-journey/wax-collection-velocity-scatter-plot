# A quadrant from two numbers

> **Trust:** `educational-reference`  
> **Catalog:** `wax-ecosystem-blueprint-catalog` (private index; not this public course)

**Goal:** Classify `holdDays` and `velocityPer30d` into a quadrant. The numbers are arguments. No market is scanned. `wash_suspect` is not a finding about a wallet.

The course is [EDUCATION.md](./EDUCATION.md).

| Inputs | Quadrant |
| --- | --- |
| hold 90, velocity 3 | `diamond_hands` (hold >= 90 and velocity < 4) |
| hold 89, velocity 3 | `long_term_hold` |
| hold 14, velocity 4 | `active_trading` (14 is not `< 14`) |
| hold 13, velocity 4 | `fast_flip` |
| hold 14, velocity 10 | `wash_suspect` (velocity >= 10 and hold <= 14) |
| `suspectedWash: true` | `wash_suspect`, even at hold 100 and velocity 0 |

`examples/live/**` is not part of `npm test`.

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

| Quadrant | Predicate |
| --- | --- |
| `diamond_hands` | hold >= 90 and velocity < 4 |
| `long_term_hold` | hold >= 60 and velocity < 4, and not diamond |
| `fast_flip` | hold < 14 and velocity >= 4 |
| `active_trading` | none of the above |
| `wash_suspect` | `suspectedWash`, or velocity >= 10 and hold <= 14. This branch wins first. |

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
