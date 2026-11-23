# AI handoff — collection velocity scatter

## Non-negotiables

1. Defaults: hold high **60**, hold low **14**, velocity high **4**, wash velocity **10**, diamond hold **90** (`60 * 1.5`).
2. hold 90 + velocity 3 → `diamond_hands`. hold 14 + velocity 10 → `wash_suspect`.
3. `suspectedWash: true` **wins** regardless of hold/velocity numbers.
4. Demo ten templates: wash-share flag at exactly **20%** wash points.
5. **Not** a live market scan. Soft labels only — not a ban authority.
6. Different product from windowed wash deduplicator / volume deduplicator / two-trade pattern flag.

## Prompt seeds

- "Given TemplateVelocityPoint JSON, run classifyCollection and explain quadrant mix and flags."
- "Sketch deriving holdDays and velocityPer30d from sale events."
- "suspectedWash true with diamond hold numbers — which label wins?"
- "Refuse treating wash_suspect as proof for suspension."

## Do not

- Scan live markets from unit tests.
- Claim legal findings from soft labels.
- Merge inputs with volume-only wash product without a test.
