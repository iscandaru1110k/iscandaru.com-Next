import { DateParts } from "@/features/labo/types/date";

const MIN_YEAR = 1;
const MAX_YEAR = 9999;

export const calculateDateAddition = (baseDate: Date, days: number): Date => {
  const result = new Date(baseDate.getTime());
  result.setDate(result.getDate() + days);
  return result;
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

export const normalizeDayDeltaInput = (value: string): string => {
  const trimmed = value.trim();
  const sign = trimmed.startsWith("-") ? "-" : "";
  const digits = trimmed.replace(/[^0-9]/g, "");

  return `${sign}${digits}`;
};

export const isYearInRange = (year: string): boolean => {
  return Number(year) >= MIN_YEAR && Number(year) <= MAX_YEAR;
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

export const toDayDelta = (value: string): number | null => {
  if (!value || value === "-") return null;

  const days = Number(value);

  return Number.isInteger(days) ? days : null;
};

export const formatDate = (date: Date): string => {
  return `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日`;
};

