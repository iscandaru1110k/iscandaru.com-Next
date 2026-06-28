"use client";

import { useState } from "react";
import { DateParts } from "@/features/labo/types/date";
import { DateAdditionDateInputField } from "./DateAdditionDateInputField";
import { DateAdditionResult } from "./DateAdditionResult";
import {
  calculateDateAddition,
  normalizeDayDeltaInput,
  toDate,
  toDayDelta,
} from "@/features/labo/date-addition/utils/dateAddition";
import styles from "./DateAdditionCalculator.module.css";

const EMPTY_DATE_PARTS: DateParts = {
  year: "",
  month: "",
  day: "",
};

export const DateAdditionCalculator = () => {
  const [baseDate, setBaseDate] = useState<DateParts>(EMPTY_DATE_PARTS);
  const [dayDeltaInput, setDayDeltaInput] = useState("");

  const baseDateObj = toDate(baseDate);
  const dayDelta = toDayDelta(dayDeltaInput);
  const isDateComplete = !!baseDate.year && !!baseDate.month && !!baseDate.day;
  const isInputComplete = isDateComplete && dayDelta !== null;
  const hasInvalidDate = isDateComplete && !baseDateObj;
  const hasInvalidDayDelta = dayDeltaInput !== "" && dayDelta === null;
  const resultDate =
    baseDateObj && dayDelta !== null
      ? calculateDateAddition(baseDateObj, dayDelta)
      : null;

  return (
    <section className={styles.calculator}>
      <div className={styles.header}>
        <p>基準日から指定した日数を足して、日付を計算します。</p>
      </div>

      <div className={styles.fields}>
        <DateAdditionDateInputField
          label="基準日"
          value={baseDate}
          onChange={setBaseDate}
        />

        <div className={styles.inputGroup}>
          <label className={styles.label} htmlFor="day-delta">
            加算する日数
            <span className={styles.hint}>負の値も入力できます</span>
          </label>
          <input
            id="day-delta"
            type="text"
            inputMode="numeric"
            placeholder="100"
            value={dayDeltaInput}
            onChange={(e) =>
              setDayDeltaInput(normalizeDayDeltaInput(e.target.value))
            }
            className={styles.field}
          />
        </div>
      </div>

      <DateAdditionResult
        baseDate={baseDateObj}
        resultDate={resultDate}
        dayDelta={dayDelta}
        isInputComplete={isInputComplete}
        hasInvalidDate={hasInvalidDate}
        hasInvalidDayDelta={hasInvalidDayDelta}
      />
    </section>
  );
};

