"use client";

import { useState } from "react";
import { DateInputField } from "./DateInputField";
import { DateParts } from "../../types/date";
import { DateDiffResult } from "./DateDiffResult";
import {
  toDate,
  calculateDateDiff,
} from "@/features/labo/date-diff/utils/date";
import styles from "./DateDiffCalculator.module.css";

const EMPTY_DATE_PARTS: DateParts = {
  year: "",
  month: "",
  day: "",
};

export const DateDiffCalculator = () => {
  const [startDate, setStartDate] = useState<DateParts>(EMPTY_DATE_PARTS);
  const [endDate, setEndDate] = useState<DateParts>(EMPTY_DATE_PARTS);

  const startDateObj = toDate(startDate);
  const endDateObj = toDate(endDate);

  const isInputComplete =
    !!startDate.year &&
    !!startDate.month &&
    !!startDate.day &&
    !!endDate.year &&
    !!endDate.month &&
    !!endDate.day;
  const hasInvalidDate = isInputComplete && (!startDateObj || !endDateObj);

  const diff =
    startDateObj && endDateObj
      ? calculateDateDiff(startDateObj, endDateObj)
      : null;

  return (
    <section className={styles.calculator}>
      <div className={styles.header}>
        <h2>日付差分計算</h2>
        <p>日数の計算、お任せください。</p>
      </div>

      <div className={styles.fields}>
        <DateInputField
          label="開始日"
          value={startDate}
          onChange={setStartDate}
        />
        <DateInputField label="終了日" value={endDate} onChange={setEndDate} />
      </div>

      <DateDiffResult
        diff={diff}
        isInputComplete={isInputComplete}
        hasInvalidDate={hasInvalidDate}
      />
    </section>
  );
};
