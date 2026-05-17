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

  if (hasInvalidDate) {
    message = "存在する日付を選択してください。";
  } else if (isInputComplete && diff !== null) {
    message = "差分";
    valueText = `${diff}日`;
  }

  return (
    <div className={styles.result}>
      <p className={styles.resultMessage}>{message}</p>
      <p className={styles.resultValue}>{valueText}</p>
    </div>
  );
};
