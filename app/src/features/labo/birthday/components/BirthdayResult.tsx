"use client";

import { BirthdayCalculationResult } from "@/features/labo/birthday/types/birthday";
import styles from "./BirthdayCalculator.module.css";

type BirthdayResultProps = {
  name: string;
  result: BirthdayCalculationResult | null;
  hasInvalidDate: boolean;
};

const formatNumber = (value: number): string => {
  return value.toLocaleString("ja-JP");
};

export const BirthdayResult = ({
  name,
  result,
  hasInvalidDate,
}: BirthdayResultProps) => {
  if (hasInvalidDate) {
    return (
      <div className={styles.result}>
        <p className={styles.errorText}>存在する生年月日を入力してください。</p>
      </div>
    );
  }

  if (!result) {
    return null;
  }

  const displayName = name.trim() || "あなた";

  return (
    <div className={styles.result}>
      {result.isBirthdayToday && (
        <p className={styles.birthdayMessage}>
          {displayName}さん、お誕生日おめでとうございます。
        </p>
      )}
      <dl className={styles.resultList}>
        <div>
          <dt>年齢</dt>
          <dd>{formatNumber(result.age)}歳</dd>
        </div>
        <div>
          <dt>生存日数</dt>
          <dd>{formatNumber(result.livedDays)}日</dd>
        </div>
        <div>
          <dt>次の誕生日まで</dt>
          <dd>{formatNumber(result.daysUntilNextBirthday)}日</dd>
        </div>
        <div>
          <dt>生存時間</dt>
          <dd>{formatNumber(result.livedHours)}時間</dd>
        </div>
        <div>
          <dt>生存秒数</dt>
          <dd>{formatNumber(result.livedSeconds)}秒</dd>
        </div>
      </dl>
    </div>
  );
};
