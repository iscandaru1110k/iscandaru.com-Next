import { MILLISECONDS_PER_DAY } from "@/features/labo/constants/time";
import { DateParts } from "@/features/labo/types/date";
import {
  BirthdayAgeParts,
  BirthdayCalculationResult,
  BirthdayDisplayDetails,
  BirthdayElapsedParts,
} from "@/features/labo/birthday/types/birthday";

const MIN_YEAR = 1;
const MAX_YEAR = 9999;
const HOURS_PER_DAY = 24;
const SECONDS_PER_DAY = 86400;
const MILLISECONDS_PER_SECOND = 1000;
const MILLISECONDS_PER_MINUTE = 60 * MILLISECONDS_PER_SECOND;
const MILLISECONDS_PER_HOUR = 60 * MILLISECONDS_PER_MINUTE;
const TEN_THOUSAND = 10000;
const HUNDRED_MILLION = 100000000;
const WEEKDAY_NAMES = [
  "日曜日",
  "月曜日",
  "火曜日",
  "水曜日",
  "木曜日",
  "金曜日",
  "土曜日",
];

const startOfDay = (date: Date): Date => {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
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

export const isYearInRange = (year: string): boolean => {
  return Number(year) >= MIN_YEAR && Number(year) <= MAX_YEAR;
};

export const toDate = (parts: DateParts): Date | null => {
  if (!parts.year || !parts.month || !parts.day) return null;

  const year = Number(parts.year);
  const month = Number(parts.month);
  const day = Number(parts.day);

  if (
    [year, month, day].some((value) => Number.isNaN(value)) ||
    !isYearInRange(parts.year)
  ) {
    return null;
  }

  const date = new Date(year, month - 1, day);

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

export const isLeapYear = (year: number): boolean => {
  return year % 400 === 0 || (year % 4 === 0 && year % 100 !== 0);
};

const getBirthdayInYear = (birthDate: Date, year: number): Date => {
  const month = birthDate.getMonth();
  const day = birthDate.getDate();

  if (month === 1 && day === 29 && !isLeapYear(year)) {
    return new Date(year, 1, 28);
  }

  return new Date(year, month, day);
};

const addMonths = (date: Date, months: number): Date => {
  return new Date(date.getFullYear(), date.getMonth() + months, date.getDate());
};

export const formatBirthdayNumber = (value: number): string => {
  return value.toLocaleString("ja-JP");
};

export const formatBirthdayDate = (date: Date): string => {
  return `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日（${
    WEEKDAY_NAMES[date.getDay()]
  }）`;
};

export const formatApproximateLargeNumber = (value: number): string => {
  if (value >= HUNDRED_MILLION) {
    const oku = Math.floor(value / HUNDRED_MILLION);
    const man = Math.floor((value % HUNDRED_MILLION) / TEN_THOUSAND);
    return `${oku}億${man}万`;
  }

  if (value >= TEN_THOUSAND) {
    return `${Math.floor(value / TEN_THOUSAND)}万`;
  }

  return formatBirthdayNumber(value);
};

export const calculateAgeParts = (
  birthDate: Date,
  today: Date = new Date(),
): BirthdayAgeParts => {
  const todayDate = startOfDay(today);
  const birthDateValue = startOfDay(birthDate);
  const years = calculateAge(birthDateValue, todayDate);
  const lastBirthday = getBirthdayInYear(
    birthDateValue,
    birthDateValue.getFullYear() + years,
  );
  let months = 0;

  while (addMonths(lastBirthday, months + 1).getTime() <= todayDate.getTime()) {
    months += 1;
  }

  const monthStart = addMonths(lastBirthday, months);
  const days = Math.floor(
    (todayDate.getTime() - monthStart.getTime()) / MILLISECONDS_PER_DAY,
  );

  return { years, months, days };
};

export const calculateExactLivedHours = (
  birthDate: Date,
  today: Date = new Date(),
): number => {
  return Math.floor(
    (today.getTime() - birthDate.getTime()) / MILLISECONDS_PER_HOUR,
  );
};

export const calculateExactLivedSeconds = (
  birthDate: Date,
  today: Date = new Date(),
): number => {
  return Math.floor(
    (today.getTime() - birthDate.getTime()) / MILLISECONDS_PER_SECOND,
  );
};

export const calculateElapsedParts = (
  birthDate: Date,
  today: Date = new Date(),
): BirthdayElapsedParts => {
  const elapsed = today.getTime() - birthDate.getTime();

  return {
    years: calculateAge(birthDate, today),
    days: Math.floor(elapsed / MILLISECONDS_PER_DAY) % 365,
    hours: Math.floor((elapsed % MILLISECONDS_PER_DAY) / MILLISECONDS_PER_HOUR),
    minutes: Math.floor((elapsed % MILLISECONDS_PER_HOUR) / MILLISECONDS_PER_MINUTE),
    seconds: Math.floor(
      (elapsed % MILLISECONDS_PER_MINUTE) / MILLISECONDS_PER_SECOND,
    ),
  };
};

export const buildBirthdayDisplayDetails = (
  birthDate: Date,
  today: Date = new Date(),
): BirthdayDisplayDetails => {
  const exactHours = calculateExactLivedHours(birthDate, today);
  const exactSeconds = calculateExactLivedSeconds(birthDate, today);

  return {
    todayText: formatBirthdayDate(today),
    birthDateText: formatBirthdayDate(birthDate),
    ageParts: calculateAgeParts(birthDate, today),
    elapsedParts: calculateElapsedParts(birthDate, today),
    exactHours,
    exactSeconds,
    approximateHoursText: formatApproximateLargeNumber(exactHours),
    approximateSecondsText: formatApproximateLargeNumber(exactSeconds),
  };
};

export const calculateAge = (birthDate: Date, today: Date = new Date()): number => {
  const todayDate = startOfDay(today);
  const birthDateValue = startOfDay(birthDate);
  const thisYearBirthday = getBirthdayInYear(
    birthDateValue,
    todayDate.getFullYear(),
  );
  let age = todayDate.getFullYear() - birthDateValue.getFullYear();

  if (todayDate.getTime() < thisYearBirthday.getTime()) {
    age -= 1;
  }

  return age;
};

export const calculateLivedDays = (
  birthDate: Date,
  today: Date = new Date(),
): number => {
  const birthDateValue = startOfDay(birthDate);
  const todayDate = startOfDay(today);

  return Math.floor(
    (todayDate.getTime() - birthDateValue.getTime()) / MILLISECONDS_PER_DAY,
  );
};

export const calculateDaysUntilNextBirthday = (
  birthDate: Date,
  today: Date = new Date(),
): number => {
  const birthDateValue = startOfDay(birthDate);
  const todayDate = startOfDay(today);
  const birthdayThisYear = getBirthdayInYear(
    birthDateValue,
    todayDate.getFullYear(),
  );
  const nextBirthday =
    todayDate.getTime() <= birthdayThisYear.getTime()
      ? birthdayThisYear
      : getBirthdayInYear(birthDateValue, todayDate.getFullYear() + 1);

  return Math.floor(
    (nextBirthday.getTime() - todayDate.getTime()) / MILLISECONDS_PER_DAY,
  );
};

export const calculateBirthday = (
  birthDate: Date,
  today: Date = new Date(),
): BirthdayCalculationResult | null => {
  const birthDateValue = startOfDay(birthDate);
  const todayDate = startOfDay(today);

  if (birthDateValue.getTime() > todayDate.getTime()) {
    return null;
  }

  const livedDays = calculateLivedDays(birthDateValue, todayDate);
  const daysUntilNextBirthday = calculateDaysUntilNextBirthday(
    birthDateValue,
    todayDate,
  );

  return {
    age: calculateAge(birthDateValue, todayDate),
    livedDays,
    daysUntilNextBirthday,
    isBirthdayToday: daysUntilNextBirthday === 0,
    livedHours: livedDays * HOURS_PER_DAY,
    livedSeconds: livedDays * SECONDS_PER_DAY,
  };
};
