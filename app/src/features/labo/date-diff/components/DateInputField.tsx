"use client";

import {
  getDayOptions,
  getMonthOptions,
  normalizeYearInput,
  isYearInRange,
} from "@/features/labo/date-diff/utils/date";
import { DateParts } from "../../types/date";
import styles from "./DateDiffCalculator.module.css";

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
    <div className={styles.inputGroup}>
      <label className={styles.label}>
        {label}
        <span className={styles.hint}>西暦/月/日</span>
      </label>
      {isInvalidYear && (
        <p className={styles.error}>
          年は{MIN_YEAR}年〜{MAX_YEAR}年の範囲で入力してください
        </p>
      )}
      <div className={styles.dateGrid}>
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
          className={styles.field}
        />

        <select
          aria-label={`${label}の月`}
          value={value.month}
          onChange={(e) => onChange({ ...value, month: e.target.value })}
          className={styles.field}
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
          className={styles.field}
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
