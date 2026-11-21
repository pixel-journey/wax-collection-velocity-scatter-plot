# Security — hold/velocity quadrants

## Closed in product rules / tests

| Issue | Behavior |
| --- | --- |
| `suspectedWash` flag | forces `wash_suspect` before other branches |
| Default thresholds | high hold 60, low 14, velocity 4, wash velocity 10, diamond 90 (`60 * 1.5`) |
| hold 90 + velocity 3 | `diamond_hands` |
| hold 14 + velocity 10 | `wash_suspect` |
| Demo ten templates | wash-share flag at exactly 20% wash points |

## Not closed (production)

| Concern | Guidance |
| --- | --- |
| Live sales / AtomicMarket | Not read; arguments only |
| Legal wash finding | Soft label only — never auto-ban |
| Overlap with trade-window wash labs | Different inputs (two numbers + optional flag vs sale lists / 3600s windows) |
| Threshold tuning | Product policy; defaults are educational |

## Attack angles

1. Banning accounts from `wash_suspect` alone.  
2. Claiming AtomicMarket or Hyperion was scanned.  
3. Mixing this with round-trip / volume wash detectors without new tests.  
4. Treating demo cohort flags (`wash-share`, `holder-heavy`) as on-chain enforcement.  
5. Passing fabricated `holdDays` / `velocityPer30d` as if they were explorer truth.

## Honesty limits

No network in the pure classifier.

| Sibling | Distinction |
| --- | --- |
| [wash-trading-deduplicator](https://github.com/pixel-journey/wax-wash-trading-deduplicator) | 3600s clock window |
| [pattern flag](https://github.com/pixel-journey/wax-nft-wash-trading-pattern-flag) | Two-trade reverse |
| [volume deduplicator](https://github.com/pixel-journey/wax-wash-trading-volume-deduplicator) | `2*min`, no clock |

[docs.wax.io](https://docs.wax.io/).
