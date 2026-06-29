"use client";

import { DateParts } from "@/features/labo/types/date";
import {
  getDayOptions,
  getMonthOptions,
  isYearInRange,
  normalizeYearInput,
} from "@/features/labo/countdown/utils/countdown";
import styles from "./CountdownCalculator.module.css";

type CountdownDateInputFieldProps = {
  label: string;
  value: DateParts;
  onChange: (next: DateParts) => void;
};

export const CountdownDateInputField = ({
  label,
  value,
  onChange,
}: CountdownDateInputFieldProps) => {
  const months = getMonthOptions();
  const days = getDayOptions(value.year, value.month);
  const isInvalidYear = value.year !== "" && !isYearInRange(value.year);

  return (
    <div className={styles.inputGroup}>
      <label className={styles.labelTop}>
        {label}
        <span className={styles.hint}>西暦/月/日</span>
      </label>
      {isInvalidYear && (
        <p className={styles.error}>年は1年〜9999年の範囲で入力してください</p>
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
