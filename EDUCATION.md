# Education — a quadrant from numbers you pass

> **Rung:** `npm test` runs `examples/engines.test.ts`. The React files and `examples/live/**` are not executed.  
> **The test is the rule.**

`classifyPoint` does not read AtomicMarket. `holdDays` and `velocityPer30d` are arguments.

## What you should be able to do

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

### Predict, then run

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

---

## Masterclass — not a sale, not backing

`wax-nft-wash-trading-pattern-flag`, `wax-wash-trading-deduplicator`, and `wax-wash-trading-volume-deduplicator` look at trades. This function looks at two numbers and an optional boolean. A wash quadrant is not a round trip and not subtracted volume.

AtomicMarket v2 listings are one asset. That does not change a hold day. This is not `backasset` and not a holder airdrop.

### What this course will not teach

- That the page fetched sales
- A legal finding from `wash_suspect`
- Native NFT backing
