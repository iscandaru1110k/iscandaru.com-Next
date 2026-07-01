export type BirthdayCalculationResult = {
  age: number;
  livedDays: number;
  daysUntilNextBirthday: number;
  isBirthdayToday: boolean;
  livedHours: number;
  livedSeconds: number;
};

export type BirthdayAgeParts = {
  years: number;
  months: number;
  days: number;
};

export type BirthdayElapsedParts = {
  years: number;
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

export type BirthdayDisplayDetails = {
  todayText: string;
  birthDateText: string;
  ageParts: BirthdayAgeParts;
  elapsedParts: BirthdayElapsedParts;
  exactHours: number;
  exactSeconds: number;
  approximateHoursText: string;
  approximateSecondsText: string;
};

export type BirthdayShareMode = "max" | "simple" | "minimum" | "neon";
