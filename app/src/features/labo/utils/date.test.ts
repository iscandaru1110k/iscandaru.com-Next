import { describe, expect, it } from "vitest";
import { calculateDateDiff } from "./date";

describe("calculateDateDiff", () => {
  it("returns 0 for the same date", () => {
    expect(calculateDateDiff("2026-05-01", "2026-05-01")).toBe(0);
  });

  it("returns 1 for the next day", () => {
    expect(calculateDateDiff("2026-05-01", "2026-05-02")).toBe(1);
  });

  it("returns 7 for a 7-day difference", () => {
    expect(calculateDateDiff("2026-05-01", "2026-05-08")).toBe(7);
  });

  it("returns -1 when start date is after end date", () => {
    expect(calculateDateDiff("2026-05-02", "2026-05-01")).toBe(-1);
  });
});
