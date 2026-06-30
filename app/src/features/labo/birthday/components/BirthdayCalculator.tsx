"use client";

import { useState } from "react";
import { DateParts } from "@/features/labo/types/date";
import {
  calculateBirthday,
  toDate,
} from "@/features/labo/birthday/utils/birthday";
import { BirthdayInputField } from "@/features/labo/birthday/components/BirthdayInputField";
import { BirthdayResult } from "@/features/labo/birthday/components/BirthdayResult";
import styles from "./BirthdayCalculator.module.css";

const EMPTY_DATE_PARTS: DateParts = {
  year: "",
  month: "",
  day: "",
};

export const BirthdayCalculator = () => {
  const [name, setName] = useState("");
  const [birthDate, setBirthDate] = useState<DateParts>(EMPTY_DATE_PARTS);

  const isInputComplete =
    !!birthDate.year && !!birthDate.month && !!birthDate.day;
  const birthDateObj = toDate(birthDate);
  const result = birthDateObj ? calculateBirthday(birthDateObj) : null;
  const hasInvalidDate = isInputComplete && result === null;

  return (
    <section className={styles.calculator}>
      <div className={styles.header}>
        <p>生年月日から、今日までの時間を計算します。</p>
      </div>

      <BirthdayInputField
        name={name}
        birthDate={birthDate}
        onNameChange={setName}
        onBirthDateChange={setBirthDate}
      />

      {isInputComplete && (
        <BirthdayResult
          name={name}
          birthDate={birthDateObj}
          result={result}
          hasInvalidDate={hasInvalidDate}
        />
      )}
    </section>
  );
};
