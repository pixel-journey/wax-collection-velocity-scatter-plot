# Education — a quadrant from numbers you pass

> **Rung:** `npm test` runs `examples/engines.test.ts`. The React files and `examples/live/**` are not executed.  
> **The test is the rule.**

`classifyPoint` does not read AtomicMarket. `holdDays` and `velocityPer30d` are arguments.

Wash siblings (different products): [pattern flag](https://github.com/pixel-journey/wax-nft-wash-trading-pattern-flag) · [deduplicator](https://github.com/pixel-journey/wax-wash-trading-deduplicator) · [volume](https://github.com/pixel-journey/wax-wash-trading-volume-deduplicator).

Official context: [docs.wax.io](https://docs.wax.io/).

## Learning outcomes

| Level | After this file |
| --- | --- |
| Beginner | Name the five quadrants from the defaults |
| Intermediate | Hit the edges at 14, 60, 90, and velocity 4 and 10 |
| Masterclass | Keep this apart from the three wash labs |

---

## Beginner — one scene

Defaults: high hold 60 days, low hold 14, high velocity 4, wash velocity 10. Diamond hands is `holdHighDays * 1.5`, so 90.

```ts
classifyPoint({ id: "1", name: "T", holdDays: 90, velocityPer30d: 3 }).quadrant
// "diamond_hands"

classifyPoint({ id: "1", name: "T", holdDays: 14, velocityPer30d: 10 }).quadrant
// "wash_suspect"
```

`suspectedWash: true` is wash even at hold 100 and velocity 0. The other wash labs are not called.

```bash
npm test
```

---

## Intermediate — the comparisons

| Inputs | Quadrant | Why |
| --- | --- | --- |
| hold 90, velocity 3 | `diamond_hands` | hold >= 90 and velocity < 4 |
| hold 89, velocity 3 | `long_term_hold` | hold >= 60, not yet 90 |
| hold 14, velocity 4 | `active_trading` | hold is not `< 14`, velocity is not `>= 10` |
| hold 13, velocity 4 | `fast_flip` | hold < 14 and velocity >= 4 |
| hold 14, velocity 10 | `wash_suspect` | velocity >= 10 and hold <= 14 |
| any point with `suspectedWash` | `wash_suspect` | the flag wins before the other branches |

The demo of ten templates is four `diamond_hands`, two `active_trading`, two `fast_flip`, and two `wash_suspect`. Two of ten is exactly 20%, so the only flag is `wash-share`. Four diamond hands are 40%, which is under the 50% holder flag.

Four long holds raise `small-sample` and then `holder-heavy`. One wash in five is `wash-share` and not `small-sample`. Two fast flips in five is `flip-heavy`. Five quiet points (hold 30, velocity 1) are `neutral`.

### Attack → test

| Attack | Lab behavior |
| --- | --- |
| Treat wash quadrant as legal finding | soft label only |
| Call AtomicMarket from pure classify | arguments only |
| Confuse with volume deduplicator | different inputs (trades vs hold/velocity) |

---

## Masterclass — not a sale, not backing

`wax-nft-wash-trading-pattern-flag`, `wax-wash-trading-deduplicator`, and `wax-wash-trading-volume-deduplicator` look at trades. This function looks at two numbers and an optional boolean. A wash quadrant is not a round trip and not subtracted volume.

### Common mistakes

1. Treating `wash_suspect` as a ban.  
2. Claiming the page fetched sales.  
3. Mixing hold-day thresholds with the 3600s trade window labs.

### Exercises

1. hold 90, velocity 3 — quadrant? (**diamond_hands**.)  
2. Does `suspectedWash` override hold 100? (**Yes**.)  
3. Is this a live market scan? (**No**.)

---

## What this course will not teach

- That the page fetched sales
- A legal finding from `wash_suspect`
- Native NFT backing
