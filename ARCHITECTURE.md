# ARCHITECTURE.md — Collection Velocity Scatter

## Invariants

1. Classification is pure given points + thresholds
2. Demo data is deterministic (no Math.random)
3. Wash labels are heuristic signals
4. Scatter is optional SVG; counts/flags are enough for education

## Flow

```
AtomicMarket sales → metrics → classifyCollection → UI
```

---

*Pixel Journey*
