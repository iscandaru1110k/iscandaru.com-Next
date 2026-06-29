import { MILLISECONDS_PER_DAY } from "@/features/labo/constants/time";
import { DateParts } from "@/features/labo/types/date";

const MIN_YEAR = 1;
const MAX_YEAR = 9999;
const MILLISECONDS_PER_HOUR = 60 * 60 * 1000;
const MILLISECONDS_PER_MINUTE = 60 * 1000;
const MILLISECONDS_PER_SECOND = 1000;

export type CountdownStatus = "future" | "past" | "today";

export type CountdownResult = {
  status: CountdownStatus;
  days: number;
  signedDays: number;
  hours: number;
  minutes: number;
  seconds: number;
};

export type CountdownOptions = {
  useExactTime?: boolean;
};

const toUtcMidnightTime = (date: Date): number => {
  const year = date.getFullYear();
  const result = new Date(Date.UTC(year, date.getMonth(), date.getDate()));

  if (year >= 0 && year <= 99) {
    result.setUTCFullYear(year);
  }

  return result.getTime();
};

const isSameDate = (dateA: Date, dateB: Date): boolean => {
  return (
    dateA.getFullYear() === dateB.getFullYear() &&
    dateA.getMonth() === dateB.getMonth() &&
    dateA.getDate() === dateB.getDate()
  );
};

const toLocalMidnightTime = (date: Date): number => {
  const year = date.getFullYear();
  const result = new Date(year, date.getMonth(), date.getDate());

  if (year >= 0 && year <= 99) {
    result.setFullYear(year);
  }

  return result.getTime();
};

const getTimeParts = (milliseconds: number) => {
  const absoluteMilliseconds = Math.abs(milliseconds);
  const days = Math.floor(absoluteMilliseconds / MILLISECONDS_PER_DAY);
  const hours = Math.floor(
    (absoluteMilliseconds % MILLISECONDS_PER_DAY) / MILLISECONDS_PER_HOUR,
  );
  const minutes = Math.floor(
    (absoluteMilliseconds % MILLISECONDS_PER_HOUR) / MILLISECONDS_PER_MINUTE,
  );
  const seconds = Math.floor(
    (absoluteMilliseconds % MILLISECONDS_PER_MINUTE) / MILLISECONDS_PER_SECOND,
  );

  return {
    days,
    hours,
    minutes,
    seconds,
  };
};

export const calculateCountdown = (
  targetDate: Date,
  baseDate: Date = new Date(),
  options: CountdownOptions = {},
): CountdownResult => {
  if (!options.useExactTime && isSameDate(targetDate, baseDate)) {
    return {
      status: "today",
      days: 0,
      signedDays: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
    };
  }

  const rest = options.useExactTime
    ? targetDate.getTime() - baseDate.getTime()
    : toLocalMidnightTime(targetDate) - baseDate.getTime();
  const timeParts = getTimeParts(rest);
  const signedDays =
    (toUtcMidnightTime(targetDate) - toUtcMidnightTime(baseDate)) /
    MILLISECONDS_PER_DAY;

  if (rest > 0) {
    return {
      status: "future",
      days: timeParts.days,
      signedDays,
      hours: timeParts.hours,
      minutes: timeParts.minutes,
      seconds: timeParts.seconds,
    };
  }

  if (rest < 0) {
    return {
      status: "past",
      days: timeParts.days,
      signedDays,
      hours: timeParts.hours,
      minutes: timeParts.minutes,
      seconds: timeParts.seconds,
    };
  }

  return {
    status: "today",
    days: 0,
    signedDays: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  };
};

export const getMonthOptions = (): string[] => {
  return Array.from({ length: 12 }, (_, i) => String(i + 1));
};

export const getDayOptions = (year?: string, month?: string): string[] => {
  if (!year || !month) {
    return Array.from({ length: 31 }, (_, i) => String(i + 1));
  }

  const lastDay = new Date(Number(year), Number(month), 0).getDate();

  return Array.from({ length: lastDay }, (_, i) => String(i + 1));
};

export const normalizeYearInput = (value: string): string => {
  return value.replace(/[^0-9]/g, "").slice(0, 4);
};

export const normalizeTimeInput = (value: string): string => {
  return value.replace(/[^0-9]/g, "").slice(0, 2);
};

export const isYearInRange = (year: string): boolean => {
  return Number(year) >= MIN_YEAR && Number(year) <= MAX_YEAR;
};

export const isHourInRange = (hour: string): boolean => {
  if (hour === "") return true;

  return Number(hour) >= 0 && Number(hour) <= 23;
};

export const isMinuteInRange = (minute: string): boolean => {
  if (minute === "") return true;

  return Number(minute) >= 0 && Number(minute) <= 59;
};

export const toDate = (parts: DateParts): Date | null => {
  if (!parts.year || !parts.month || !parts.day) return null;

  const year = Number(parts.year);
  const month = Number(parts.month);
  const day = Number(parts.day);

  if ([year, month, day].some((value) => Number.isNaN(value))) {
    return null;
  }

  const date = new Date(year, month - 1, day);
  if (year >= 0 && year <= 99) {
    date.setFullYear(year);
  }

  if (
    Number.isNaN(date.getTime()) ||
    date.getFullYear() !== year ||
    date.getMonth() !== month - 1 ||
    date.getDate() !== day
  ) {
    return null;
  }

  return date;
};

export const withTime = (date: Date, hour: string, minute: string): Date => {
  const result = new Date(date.getTime());
  result.setHours(Number(hour || 0), Number(minute || 0), 0, 0);

  return result;
};

export const formatDate = (date: Date): string => {
  return `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日`;
};
