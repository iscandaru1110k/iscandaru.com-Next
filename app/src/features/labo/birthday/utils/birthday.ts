import { MILLISECONDS_PER_DAY } from "@/features/labo/constants/time";
import { DateParts } from "@/features/labo/types/date";
import { BirthdayCalculationResult } from "@/features/labo/birthday/types/birthday";

const MIN_YEAR = 1;
const MAX_YEAR = 9999;
const HOURS_PER_DAY = 24;
const SECONDS_PER_DAY = 86400;

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
