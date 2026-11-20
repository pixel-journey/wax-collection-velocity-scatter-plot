# Sources

| Source | Use |
| --- | --- |
| [docs.wax.io](https://docs.wax.io/) | Market product context |
| [wash-trading-deduplicator](https://github.com/pixel-journey/wax-wash-trading-deduplicator) | Trade-window flags (different product) |

## Product facts locked by tests

- Defaults: hold high 60 / low 14, velocity high 4, wash velocity 10, diamond hold `60 * 1.5 = 90`.
- hold 90 + velocity 3 → `diamond_hands`.
- hold 14 + velocity 10 → `wash_suspect`.
- `suspectedWash: true` wins regardless of hold/velocity numbers.
- Demo ten templates: wash-share flag at exactly 20% wash points.
- **Not** a live market scan.
