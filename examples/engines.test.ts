import { describe, expect, it } from "vitest";
import { classifyPoint } from "./engines";

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
