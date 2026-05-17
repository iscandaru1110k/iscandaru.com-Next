import { describe, expect, it } from "vitest";
import {
  calculateAge,
  calculateBirthday,
  calculateDaysUntilNextBirthday,
  isLeapYear,
  toDate,
} from "./birthday";

describe("birthday calculations", () => {
  it("calculates age normally", () => {
    expect(calculateAge(new Date(2000, 4, 10), new Date(2026, 4, 10))).toBe(26);
  });

  it("calculates age before birthday", () => {
    expect(calculateAge(new Date(2000, 4, 10), new Date(2026, 4, 9))).toBe(25);
  });

  it("calculates age on birthday", () => {
    expect(calculateAge(new Date(2000, 4, 10), new Date(2026, 4, 10))).toBe(26);
  });

  it("calculates age after birthday", () => {
    expect(calculateAge(new Date(2000, 4, 10), new Date(2026, 4, 11))).toBe(26);
  });

  it("detects leap years", () => {
    expect(isLeapYear(2024)).toBe(true);
    expect(isLeapYear(2025)).toBe(false);
  });

  it("handles February 29 birthdays in non-leap years as February 28", () => {
    expect(calculateAge(new Date(2000, 1, 29), new Date(2025, 1, 28))).toBe(25);
  });

  it("returns null for invalid dates", () => {
    expect(toDate({ year: "2025", month: "2", day: "29" })).toBeNull();
  });

  it("calculates days until next birthday", () => {
    expect(
      calculateDaysUntilNextBirthday(
        new Date(2000, 4, 10),
        new Date(2026, 4, 1),
      ),
    ).toBe(9);
  });

  it("detects birthday today", () => {
    const result = calculateBirthday(new Date(2000, 4, 10), new Date(2026, 4, 10));
    expect(result?.isBirthdayToday).toBe(true);
    expect(result?.daysUntilNextBirthday).toBe(0);
  });
});
