import { describe, expect, it } from "vitest";
import { calculateCountdown } from "./countdown";

describe("calculateCountdown", () => {
  it("calculates remaining days for a future date", () => {
    const result = calculateCountdown(
      new Date(2026, 0, 11),
      new Date(2026, 0, 1),
    );

    expect(result).toEqual({
      status: "future",
      days: 10,
      signedDays: 10,
      hours: 0,
      minutes: 0,
      seconds: 0,
    });
  });

  it("calculates elapsed days for a past date", () => {
    const result = calculateCountdown(
      new Date(2026, 0, 1),
      new Date(2026, 0, 11),
    );

    expect(result).toEqual({
      status: "past",
      days: 10,
      signedDays: -10,
      hours: 0,
      minutes: 0,
      seconds: 0,
    });
  });

  it("returns today when the target date is the base date", () => {
    const result = calculateCountdown(
      new Date(2026, 0, 1),
      new Date(2026, 0, 1),
    );

    expect(result).toEqual({
      status: "today",
      days: 0,
      signedDays: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
    });
  });

  it("handles month changes", () => {
    const result = calculateCountdown(
      new Date(2026, 1, 2),
      new Date(2026, 0, 31),
    );

    expect(result.days).toBe(2);
    expect(result.status).toBe("future");
  });

  it("handles year changes", () => {
    const result = calculateCountdown(
      new Date(2027, 0, 1),
      new Date(2026, 11, 31),
    );

    expect(result.days).toBe(1);
    expect(result.status).toBe("future");
  });

  it("handles leap year dates", () => {
    const result = calculateCountdown(
      new Date(2024, 2, 1),
      new Date(2024, 1, 28),
    );

    expect(result.days).toBe(2);
    expect(result.status).toBe("future");
  });

  it("does not shift days because of time differences", () => {
    const result = calculateCountdown(
      new Date(2026, 0, 2, 0, 1),
      new Date(2026, 0, 1, 23, 59),
    );

    expect(result.days).toBe(0);
    expect(result.signedDays).toBe(1);
    expect(result.status).toBe("future");
  });

  it("returns hours, minutes, and seconds until the future target date", () => {
    const result = calculateCountdown(
      new Date(2026, 0, 2),
      new Date(2026, 0, 1, 20, 30, 15),
    );

    expect(result.days).toBe(0);
    expect(result.hours).toBe(3);
    expect(result.minutes).toBe(29);
    expect(result.seconds).toBe(45);
  });

  it("returns hours, minutes, and seconds elapsed from the past target date", () => {
    const result = calculateCountdown(
      new Date(2026, 0, 1),
      new Date(2026, 0, 2, 1, 2, 3),
    );

    expect(result.days).toBe(1);
    expect(result.hours).toBe(1);
    expect(result.minutes).toBe(2);
    expect(result.seconds).toBe(3);
  });

  it("uses exact time when enabled", () => {
    const result = calculateCountdown(
      new Date(2026, 0, 1, 18, 30),
      new Date(2026, 0, 1, 12, 0),
      { useExactTime: true },
    );

    expect(result.status).toBe("future");
    expect(result.days).toBe(0);
    expect(result.hours).toBe(6);
    expect(result.minutes).toBe(30);
  });

  it("keeps date-only today result when exact time is not enabled", () => {
    const result = calculateCountdown(
      new Date(2026, 0, 1, 18, 30),
      new Date(2026, 0, 1, 12, 0),
    );

    expect(result.status).toBe("today");
    expect(result.days).toBe(0);
  });
});
