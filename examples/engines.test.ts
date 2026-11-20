import { describe, expect, it } from "vitest";
import { buildVelocityFlags, classifyCollection, classifyPoint, demoVelocityPoints } from "./engines";

const point = (holdDays: number, velocityPer30d: number, suspectedWash = false) => ({
  id: "1",
  name: "T",
  holdDays,
  velocityPer30d,
  suspectedWash,
});

describe("classifyPoint", () => {
  it("uses the default thresholds, including the wash override", () => {
    expect(classifyPoint(point(90, 3)).quadrant).toBe("diamond_hands");
    expect(classifyPoint(point(89, 3)).quadrant).toBe("long_term_hold");
    expect(classifyPoint(point(14, 4)).quadrant).toBe("active_trading");
    expect(classifyPoint(point(13, 4)).quadrant).toBe("fast_flip");
    expect(classifyPoint(point(14, 10)).quadrant).toBe("wash_suspect");
    expect(classifyPoint(point(100, 0, true)).quadrant).toBe("wash_suspect");
  });
});

describe("buildVelocityFlags", () => {
  it("locks the demo at four diamond, two active, two flip, two wash, and only wash-share", () => {
    const summary = classifyCollection(demoVelocityPoints());
    expect(summary.counts).toEqual({
      long_term_hold: 0,
      diamond_hands: 4,
      active_trading: 2,
      fast_flip: 2,
      wash_suspect: 2,
    });
    expect(summary.flags.map((flag) => flag.id)).toEqual(["wash-share"]);
  });

  it("warns below five points and alerts at exactly one wash in five", () => {
    const four = Array.from({ length: 4 }, () => classifyPoint(point(120, 1)));
    expect(buildVelocityFlags(four, countsOf(four)).map((flag) => flag.id)).toEqual([
      "small-sample",
      "holder-heavy",
    ]);
    const oneWash = [
      classifyPoint(point(14, 10)),
      ...Array.from({ length: 4 }, () => classifyPoint(point(30, 1))),
    ];
    expect(buildVelocityFlags(oneWash, countsOf(oneWash)).map((flag) => flag.id)).toEqual(["wash-share"]);
  });

  it("warns at exactly two fast flips in five, and is neutral when nothing concentrates", () => {
    const flips = [
      ...Array.from({ length: 2 }, () => classifyPoint(point(13, 4))),
      ...Array.from({ length: 3 }, () => classifyPoint(point(30, 1))),
    ];
    expect(buildVelocityFlags(flips, countsOf(flips)).map((flag) => flag.id)).toEqual(["flip-heavy"]);
    const quiet = Array.from({ length: 5 }, () => classifyPoint(point(30, 1)));
    expect(buildVelocityFlags(quiet, countsOf(quiet)).map((flag) => flag.id)).toEqual(["neutral"]);
  });
});

function countsOf(points: ReturnType<typeof classifyPoint>[]) {
  const counts = {
    long_term_hold: 0,
    diamond_hands: 0,
    active_trading: 0,
    fast_flip: 0,
    wash_suspect: 0,
  };
  for (const row of points) counts[row.quadrant] += 1;
  return counts;
}