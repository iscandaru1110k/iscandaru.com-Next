"use client";

import styles from "./DateDiffCalculator.module.css";

type DateDiffResultProps = {
  diff: number | null;
  isInputComplete: boolean;
  hasInvalidDate: boolean;
};

export const DateDiffResult = ({
  diff,
  isInputComplete,
  hasInvalidDate,
}: DateDiffResultProps) => {
  let message = "開始日と終了日の年・月・日を選択してください。";
  let valueText = "-";
  const isComplete = isInputComplete && diff !== null && !hasInvalidDate;

  if (hasInvalidDate) {
    message = "存在する日付を選択してください。";
  } else if (isComplete) {
    message = "差分";
    valueText = `${diff}日`;
  }

  return (
    <div
      className={`${styles.result} ${isComplete ? styles.resultComplete : ""}`}
    >
      <p className={styles.resultMessage}>{message}</p>
      <p className={styles.resultValue}>{valueText}</p>
    </div>
  );
};
