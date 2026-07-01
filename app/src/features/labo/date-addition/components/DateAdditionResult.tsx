"use client";

import { formatDate } from "@/features/labo/date-addition/utils/dateAddition";
import styles from "./DateAdditionCalculator.module.css";

type DateAdditionResultProps = {
  baseDate: Date | null;
  resultDate: Date | null;
  dayDelta: number | null;
  isInputComplete: boolean;
  hasInvalidDate: boolean;
  hasInvalidDayDelta: boolean;
};

const getDeltaText = (dayDelta: number): string => {
  if (dayDelta === 0) return "同じ日";
  if (dayDelta > 0) return `${dayDelta}日後`;

  return `${Math.abs(dayDelta)}日前`;
};

export const DateAdditionResult = ({
  baseDate,
  resultDate,
  dayDelta,
  isInputComplete,
  hasInvalidDate,
  hasInvalidDayDelta,
}: DateAdditionResultProps) => {
  let message = "基準日と加算する日数を入力してください。";
  let valueText = "-";
  const isComplete =
    isInputComplete &&
    baseDate !== null &&
    resultDate !== null &&
    dayDelta !== null &&
    !hasInvalidDate &&
    !hasInvalidDayDelta;

  if (hasInvalidDate) {
    message = "存在する基準日を選択してください。";
  } else if (hasInvalidDayDelta) {
    message = "日数を整数で入力してください。";
  } else if (isComplete) {
    message = `${formatDate(baseDate)}から${getDeltaText(dayDelta)}は`;
    valueText = `${formatDate(resultDate)}`;
  }

  return (
    <div
      className={`${styles.result} ${isComplete ? styles.resultComplete : ""}`}
    >
      <p className={styles.resultMessage}>{message}</p>
      <p className={styles.resultValue}>{valueText}</p>
      {isComplete && <p className={styles.resultMessage}>になります！</p>}
    </div>
  );
};
