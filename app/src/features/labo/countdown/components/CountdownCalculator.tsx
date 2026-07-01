"use client";

import { useEffect, useState } from "react";
import { DateParts } from "@/features/labo/types/date";
import { CountdownDateInputField } from "./CountdownDateInputField";
import { CountdownResult } from "./CountdownResult";
import {
  calculateCountdown,
  isHourInRange,
  isMinuteInRange,
  normalizeTimeInput,
  toDate,
  withTime,
} from "@/features/labo/countdown/utils/countdown";
import styles from "./CountdownCalculator.module.css";

const EMPTY_DATE_PARTS: DateParts = {
  year: "",
  month: "",
  day: "",
};

export const CountdownCalculator = () => {
  const [targetDate, setTargetDate] = useState<DateParts>(EMPTY_DATE_PARTS);
  const [usesTime, setUsesTime] = useState(false);
  const [targetHour, setTargetHour] = useState("");
  const [targetMinute, setTargetMinute] = useState("");
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setNow(new Date());
    }, 1000);

    return () => window.clearInterval(intervalId);
  }, []);

  const targetDateObj = toDate(targetDate);
  const hasInvalidTime =
    usesTime && (!isHourInRange(targetHour) || !isMinuteInRange(targetMinute));
  const targetDateTimeObj =
    targetDateObj && !hasInvalidTime && usesTime
      ? withTime(targetDateObj, targetHour, targetMinute)
      : targetDateObj;
  const isDateComplete =
    !!targetDate.year && !!targetDate.month && !!targetDate.day;
  const isInputComplete = isDateComplete && !hasInvalidTime;
  const hasInvalidDate = isDateComplete && !targetDateObj;
  const result =
    targetDateTimeObj && !hasInvalidTime
      ? calculateCountdown(targetDateTimeObj, now, { useExactTime: usesTime })
      : null;

  return (
    <section className={styles.calculator}>
      <div className={styles.header}>
        <p>今日から目標日までの時間を計算します。</p>
      </div>

      <div className={styles.fields}>
        <CountdownDateInputField
          label="目標日"
          value={targetDate}
          onChange={setTargetDate}
        />

        <div className={styles.inputGroup}>
          <label
            className={`${styles.toggleLabel} ${
              usesTime ? styles.toggleLabelActive : ""
            }`}
          >
            <input
              className={styles.toggleInput}
              type="checkbox"
              checked={usesTime}
              onChange={(e) => setUsesTime(e.target.checked)}
            />
            <span>時刻を指定する</span>
          </label>

          {usesTime && (
            <div className={styles.timeFields}>
              <label className={styles.timeField}>
                <span className={styles.label}>時</span>
                <input
                  aria-label="目標時刻の時"
                  type="text"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  placeholder="0"
                  value={targetHour}
                  onChange={(e) =>
                    setTargetHour(normalizeTimeInput(e.target.value))
                  }
                  className={styles.field}
                />
              </label>

              <label className={styles.timeField}>
                <span className={styles.label}>分</span>
                <input
                  aria-label="目標時刻の分"
                  type="text"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  placeholder="0"
                  value={targetMinute}
                  onChange={(e) =>
                    setTargetMinute(normalizeTimeInput(e.target.value))
                  }
                  className={styles.field}
                />
              </label>
            </div>
          )}

          {hasInvalidTime && (
            <p className={styles.error}>
              時は0〜23、分は0〜59の範囲で入力してください
            </p>
          )}
        </div>
      </div>

      <CountdownResult
        targetDate={targetDateTimeObj}
        result={result}
        isInputComplete={isInputComplete}
        hasInvalidDate={hasInvalidDate}
        hasInvalidTime={hasInvalidTime}
      />
    </section>
  );
};
