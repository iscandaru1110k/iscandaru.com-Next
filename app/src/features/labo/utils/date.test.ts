import { describe, expect, it } from "vitest";
import {
  calculateDateDiff,
  getDayOptions,
  getMonthOptions,
  isValidDate,
  toDate,
} from "./date";
import { DateParts } from "../types/date";

describe("calculateDateDiff", () => {
  it("returns 0 for the same date", () => {
    const d1 = new Date(2026, 4, 1); // month is 0-based
    const d2 = new Date(2026, 4, 1);
    expect(calculateDateDiff(d1, d2)).toBe(0);
  });

  it("returns 1 for the next day", () => {
    const d1 = new Date(2026, 4, 1);
    const d2 = new Date(2026, 4, 2);
    expect(calculateDateDiff(d1, d2)).toBe(1);
  });

  it("returns 7 for a 7-day difference", () => {
    const d1 = new Date(2026, 4, 1);
    const d2 = new Date(2026, 4, 8);
    expect(calculateDateDiff(d1, d2)).toBe(7);
  });

  it("returns absolute day difference when start date is after end date", () => {
    const d1 = new Date(2026, 4, 2);
    const d2 = new Date(2026, 4, 1);
    expect(calculateDateDiff(d1, d2)).toBe(1);
  });
});

describe("getMonthOptions", () => {
  it("returns 12 non-zero-padded months", () => {
    const months = getMonthOptions();
    expect(months).toHaveLength(12);
    expect(months[0]).toBe("1");
    expect(months[11]).toBe("12");
  });
});

describe("getDayOptions", () => {
  it("returns 31 days when year or month is missing", () => {
    const days = getDayOptions();
    expect(days).toHaveLength(31);
    expect(days[0]).toBe("1");
    expect(days[30]).toBe("31");
  });

  it("returns 29 days for leap year February", () => {
    const days = getDayOptions("2024", "02");
    expect(days).toHaveLength(29);
    expect(days[28]).toBe("29");
  });

  it("returns 28 days for non-leap year February", () => {
    const days = getDayOptions("2025", "02");
    expect(days).toHaveLength(28);
    expect(days[27]).toBe("28");
  });
});

describe("isValidDate", () => {
  it("returns true for valid date", () => {
    expect(isValidDate("2026", "05", "04")).toBe(true);
  });

  it("returns false for invalid date", () => {
    expect(isValidDate("2025", "02", "29")).toBe(false);
  });

  it("returns false when any part is missing", () => {
    expect(isValidDate("2026", "", "04")).toBe(false);
  });
});

describe("toDate", () => {
  it("returns Date for valid leap day", () => {
    const result = toDate({ year: "2024", month: "02", day: "29" });
    expect(result).not.toBeNull();
    expect(result?.getFullYear()).toBe(2024);
    expect(result?.getMonth()).toBe(1); // 0-based: 1 = February
    expect(result?.getDate()).toBe(29);
  });

  it("returns null for non-leap year February 29", () => {
    const result = toDate({ year: "2023", month: "02", day: "29" });
    expect(result).toBeNull();
  });

  it("returns null for invalid date like February 31", () => {
    const result = toDate({ year: "2024", month: "02", day: "31" });
    expect(result).toBeNull();
  });

  it("handles two-digit year as existing input spec", () => {
    const result = toDate({ year: "24", month: "02", day: "29" });
    expect(result).not.toBeNull();
    expect(result?.getFullYear()).toBe(24);
    expect(result?.getMonth()).toBe(1); // 0-based: 1 = February
    expect(result?.getDate()).toBe(29);
  });

  it("returns null when input is incomplete", () => {
    const incomplete: DateParts = { year: "2024", month: "02", day: "" };
    expect(toDate(incomplete)).toBeNull();
  });
});
