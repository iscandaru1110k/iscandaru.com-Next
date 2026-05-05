"use client";

import {
  getDayOptions,
  getMonthOptions,
  normalizeYearInput,
  isYearInRange,
} from "@/features/labo/date-diff/utils/date";
import { DateParts } from "../../types/date";

type DateInputFieldProps = {
  label: string;
  value: DateParts;
  onChange: (next: DateParts) => void;
};

const MIN_YEAR = 1;
const MAX_YEAR = 9999;

export const DateInputField = ({
  label,
  value,
  onChange,
}: DateInputFieldProps) => {
  const months = getMonthOptions();
  const days = getDayOptions(value.year, value.month);
  const isInvalidYear =
    value.year !== "" && !isYearInRange(value.year, MIN_YEAR, MAX_YEAR);

  return (
    <div className="flex flex-col gap-2 rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
      <label className="text-sm font-medium text-slate-700">
        {label}
        <span className="ml-4 text-xs text-slate-500">西暦/月/日</span>
      </label>
      {isInvalidYear && (
        <p className="text-xs text-red-600">
          年は{MIN_YEAR}年〜{MAX_YEAR}年の範囲で入力してください
        </p>
      )}
      <div className="grid grid-cols-3 gap-2">
        <input
          aria-label={`${label}の年`}
          type="text"
          inputMode="numeric"
          pattern="[0-9]*"
          placeholder="年"
          value={value.year}
          onChange={(e) => {
            const year = normalizeYearInput(e.target.value);
            onChange({ ...value, year });
          }}
          className="rounded-lg border border-slate-300 bg-white px-2 py-2 text-sm text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
        />

        <select
          aria-label={`${label}の月`}
          value={value.month}
          onChange={(e) => onChange({ ...value, month: e.target.value })}
          className="rounded-lg border border-slate-300 bg-white px-2 py-2 text-sm text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
        >
          <option value="">月</option>
          {months.map((month) => (
            <option key={month} value={month}>
              {month}
            </option>
          ))}
        </select>

        <select
          aria-label={`${label}の日`}
          value={value.day}
          onChange={(e) => onChange({ ...value, day: e.target.value })}
          className="rounded-lg border border-slate-300 bg-white px-2 py-2 text-sm text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
        >
          <option value="">日</option>
          {days.map((day) => (
            <option key={day} value={day}>
              {day}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};
