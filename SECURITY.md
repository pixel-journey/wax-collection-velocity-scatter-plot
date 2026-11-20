# Security — hold/velocity quadrants

## Closed in product rules

| Issue | Behavior |
| --- | --- |
| `suspectedWash` flag | forces `wash_suspect` before other branches |
| Default thresholds | high hold 60, low 14, velocity 4, wash velocity 10, diamond 90 |

## Not closed (production)

| Concern | Guidance |
| --- | --- |
| Live sales | Not read; arguments only |
| Legal wash finding | Soft label only |
| Overlap with trade-window wash labs | Different inputs (two numbers vs sale lists) |

## Attack angles

1. Banning from `wash_suspect` alone.  
2. Claiming AtomicMarket was scanned.  
3. Mixing this with round-trip wash detectors without new tests.

## Honesty limits

No network in the pure classifier. [docs.wax.io](https://docs.wax.io/) · [wash-trading-deduplicator](https://github.com/pixel-journey/wax-wash-trading-deduplicator).
