"use client";

import { useState } from "react";
import { BirthdayCalculationResult } from "@/features/labo/birthday/types/birthday";
import {
  buildBirthdayDisplayDetails,
  formatBirthdayNumber,
} from "@/features/labo/birthday/utils/birthday";
import { BirthdayShareImage } from "@/features/labo/birthday/components/BirthdayShareImage";
import styles from "./BirthdayCalculator.module.css";

type BirthdayResultProps = {
  name: string;
  birthDate: Date | null;
  result: BirthdayCalculationResult | null;
  hasInvalidDate: boolean;
};

export const BirthdayResult = ({
  name,
  birthDate,
  result,
  hasInvalidDate,
}: BirthdayResultProps) => {
  const [isInfoOpen, setIsInfoOpen] = useState(false);

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

  if (!birthDate) {
    return null;
  }

  const today = new Date();
  const displayName = name.trim();
  const subject = displayName ? `${displayName}さん` : "あなた";
  const details = buildBirthdayDisplayDetails(birthDate, today);

  return (
    <>
      <div className={styles.result}>
        <div className={styles.resultText}>
          <p>{details.todayText}現在、</p>
          <p>
            {details.birthDateText}生まれの{subject}は
          </p>
          <p>
            生存日数が
            <span className={styles.resultNumber}>
              {formatBirthdayNumber(result.livedDays)}
            </span>
            日です！
          </p>
          <p>
            時間換算で約
            <span className={styles.resultNumber}>
              {details.approximateHoursText}
            </span>
            時間、(
            {formatBirthdayNumber(details.exactHours)}&nbsp;時間)
          </p>
          <p>
            秒数換算で約
            <span className={styles.resultNumber}>
              {details.approximateSecondsText}
            </span>
            秒です。(
            {formatBirthdayNumber(details.exactSeconds)}&nbsp;秒)
          </p>
          <div className={styles.ageLine}>
            <p>そして、{subject}の年齢は</p>
            <p>
              <span className={styles.resultNumber}>
                {details.ageParts.years}歳{details.ageParts.months}ヶ月と
                {details.ageParts.days}日
              </span>
              で、
            </p>
          </div>
          {result.isBirthdayToday ? (
            <div className={styles.birthdayNotice}>
              <p>今日が誕生日！</p>
              <p>おめでとうございます！</p>
              <p>素敵な1年になりますように...！</p>
            </div>
          ) : (
            <p>
              次の誕生日まであと
              <span className={styles.resultNumber}>
                {formatBirthdayNumber(result.daysUntilNextBirthday)}
              </span>
              日です。楽しみですね！
            </p>
          )}
        </div>
      </div>

      <BirthdayShareImage
        displayName={displayName}
        birthDate={birthDate}
        result={result}
        details={details}
      />

      <section className={styles.info}>
        <button
          type="button"
          className={styles.infoToggle}
          onClick={() => setIsInfoOpen((current) => !current)}
          aria-expanded={isInfoOpen}
        >
          ちなみに・・・
        </button>
        {isInfoOpen && (
          <div className={styles.infoContent}>
            <p>1億秒　→　3年と2ヶ月くらい</p>
            <p>10万時間　→　11年と6ヶ月くらい</p>
            <p>1万日　→　27年と5ヶ月半くらい</p>
          </div>
        )}
      </section>
    </>
  );
};
