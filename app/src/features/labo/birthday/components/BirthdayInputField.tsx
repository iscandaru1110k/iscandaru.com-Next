"use client";

import { DateParts } from "@/features/labo/types/date";
import {
  getDayOptions,
  getMonthOptions,
  isYearInRange,
  normalizeYearInput,
} from "@/features/labo/birthday/utils/birthday";
import styles from "./BirthdayCalculator.module.css";

type BirthdayInputFieldProps = {
  name: string;
  birthDate: DateParts;
  onNameChange: (name: string) => void;
  onBirthDateChange: (birthDate: DateParts) => void;
};

export const BirthdayInputField = ({
  name,
  birthDate,
  onNameChange,
  onBirthDateChange,
}: BirthdayInputFieldProps) => {
  const months = getMonthOptions();
  const days = getDayOptions(birthDate.year, birthDate.month);
  const isInvalidYear = birthDate.year !== "" && !isYearInRange(birthDate.year);

  return (
    <div className={styles.inputGroup}>
      <label className={styles.label}>
        名前
        <input
          type="text"
          value={name}
          onChange={(e) => onNameChange(e.target.value)}
          placeholder="任意"
          className={styles.textInput}
        />
      </label>

      <div className={styles.dateFields}>
        <p className={styles.labelText}>生年月日</p>
        {isInvalidYear && (
          <p className={styles.errorText}>
            年は1年から9999年の範囲で入力してください。
          </p>
        )}
        <div className={styles.dateGrid}>
          <input
            aria-label="生年月日の年"
            type="text"
            inputMode="numeric"
            pattern="[0-9]*"
            placeholder="年"
            value={birthDate.year}
            onChange={(e) => {
              onBirthDateChange({
                ...birthDate,
                year: normalizeYearInput(e.target.value),
              });
            }}
            className={styles.textInput}
          />

          <select
            aria-label="生年月日の月"
            value={birthDate.month}
            onChange={(e) =>
              onBirthDateChange({ ...birthDate, month: e.target.value })
            }
            className={styles.textInput}
          >
            <option value="">月</option>
            {months.map((month) => (
              <option key={month} value={month}>
                {month}
              </option>
            ))}
          </select>

          <select
            aria-label="生年月日の日"
            value={birthDate.day}
            onChange={(e) =>
              onBirthDateChange({ ...birthDate, day: e.target.value })
            }
            className={styles.textInput}
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
    </div>
  );
};
