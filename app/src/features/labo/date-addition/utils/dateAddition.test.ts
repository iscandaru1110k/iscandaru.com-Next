import { describe, expect, it } from "vitest";
import { calculateDateAddition } from "./dateAddition";

describe("calculateDateAddition", () => {
  it("adds positive days to the base date", () => {
    const result = calculateDateAddition(new Date(2026, 0, 1), 10);

    expect(result.getFullYear()).toBe(2026);
    expect(result.getMonth()).toBe(0);
    expect(result.getDate()).toBe(11);
  });

  it("returns the same date when adding zero days", () => {
    const result = calculateDateAddition(new Date(2026, 0, 1), 0);

    expect(result.getFullYear()).toBe(2026);
    expect(result.getMonth()).toBe(0);
    expect(result.getDate()).toBe(1);
  });

  it("adds negative days to the base date", () => {
    const result = calculateDateAddition(new Date(2026, 0, 11), -10);

    expect(result.getFullYear()).toBe(2026);
    expect(result.getMonth()).toBe(0);
    expect(result.getDate()).toBe(1);
  });

  it("handles month changes", () => {
    const result = calculateDateAddition(new Date(2026, 0, 31), 1);

    expect(result.getFullYear()).toBe(2026);
    expect(result.getMonth()).toBe(1);
    expect(result.getDate()).toBe(1);
  });

  it("handles year changes", () => {
    const result = calculateDateAddition(new Date(2026, 11, 31), 1);

    expect(result.getFullYear()).toBe(2027);
    expect(result.getMonth()).toBe(0);
    expect(result.getDate()).toBe(1);
  });

  it("handles leap year dates", () => {
    const result = calculateDateAddition(new Date(2024, 1, 28), 1);

    expect(result.getFullYear()).toBe(2024);
    expect(result.getMonth()).toBe(1);
    expect(result.getDate()).toBe(29);
  });
});

