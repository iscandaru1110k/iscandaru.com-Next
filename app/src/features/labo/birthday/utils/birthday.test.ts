import { describe, expect, it } from "vitest";
import {
  calculateAge,
  calculateAgeParts,
  calculateBirthday,
  calculateDaysUntilNextBirthday,
  buildBirthdayDisplayDetails,
  calculateElapsedParts,
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

  it("calculates age parts for result display", () => {
    expect(calculateAgeParts(new Date(1988, 0, 1), new Date(2026, 5, 28))).toEqual({
      years: 38,
      months: 5,
      days: 27,
    });
  });

  it("builds birthday display details", () => {
    const details = buildBirthdayDisplayDetails(
      new Date(1988, 0, 1),
      new Date(2026, 5, 28, 17, 22, 34),
    );

    expect(details.todayText).toBe("2026年6月28日（日曜日）");
    expect(details.birthDateText).toBe("1988年1月1日（金曜日）");
    expect(details.approximateHoursText).toBe("33万");
    expect(details.approximateSecondsText).toBe("12億1467万");
  });

  it("calculates elapsed parts for result writing", () => {
    expect(
      calculateElapsedParts(
        new Date(1988, 0, 1),
        new Date(2026, 5, 28, 17, 22, 34),
      ),
    ).toEqual({
      years: 38,
      days: 188,
      hours: 17,
      minutes: 22,
      seconds: 34,
    });
  });
});
