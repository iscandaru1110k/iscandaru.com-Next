"use client";

import {
  CountdownResult as CountdownResultType,
  formatDate,
} from "@/features/labo/countdown/utils/countdown";
import styles from "./CountdownCalculator.module.css";

type CountdownResultProps = {
  targetDate: Date | null;
  result: CountdownResultType | null;
  isInputComplete: boolean;
  hasInvalidDate: boolean;
  hasInvalidTime: boolean;
};

const padTime = (value: number): string => {
  return String(value).padStart(2, "0");
};

export const CountdownResult = ({
  targetDate,
  result,
  isInputComplete,
  hasInvalidDate,
  hasInvalidTime,
}: CountdownResultProps) => {
  let message = "目標日の年・月・日を選択してください。";
  let value = <span>-</span>;
  const isComplete =
    isInputComplete &&
    targetDate !== null &&
    result !== null &&
    !hasInvalidDate &&
    !hasInvalidTime;

  if (hasInvalidDate) {
    message = "存在する目標日を選択してください。";
  } else if (hasInvalidTime) {
    message = "存在する時刻を入力してください。";
  } else if (isComplete) {
    const timeValue = (
      <span className={styles.resultLine}>
        <span className={styles.resultNumber}>{result.days}</span>
        <span>日と</span>
        <span className={styles.resultNumberSmall}>{result.hours}</span>
        <span>時間</span>
        <span className={styles.resultNumberSmall}>
          {padTime(result.minutes)}
        </span>
        <span>分</span>
        <span className={styles.resultNumberSmall}>
          {padTime(result.seconds)}
        </span>
        <span>秒</span>
      </span>
    );

    if (result.status === "future") {
      message = `${formatDate(targetDate)}まで`;
      value = <>あと{timeValue}です！</>;
    } else if (result.status === "past") {
      message = `${formatDate(targetDate)}から`;
      value = (
        <>
          <span>{timeValue}</span>
          <br />
          経過しました！
        </>
      );
    } else {
      message = `${formatDate(targetDate)}は`;
      value = <>今日です！</>;
    }
  }

  return (
    <div
      className={`${styles.result} ${isComplete ? styles.resultComplete : ""}`}
    >
      <p className={styles.resultMessage}>{message}</p>
      <p className={styles.resultValue}>{value}</p>
    </div>
  );
};
