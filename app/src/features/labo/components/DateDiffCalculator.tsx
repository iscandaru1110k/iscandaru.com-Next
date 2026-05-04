"use client";

import { useState } from "react";
import { calculateDateDiff, toDate } from "@/features/labo/utils/date";
import { DateInputField } from "./DateInputField";
import { DateParts } from "../types/date";
import { DateDiffResult } from "./DateDiffResult";

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
  const hasInvalidDate =
    isInputComplete &&
    (!startDateObj || !endDateObj);

  const diff =
    startDateObj && endDateObj
      ? calculateDateDiff(startDateObj, endDateObj)
      : null;


  return (
    <section className="mx-auto w-full max-w-xl rounded-2xl border-2 border-blue-900/80 bg-slate-50 p-5 shadow-md sm:p-6">
      <div className="mb-5 border-b border-slate-200 pb-3">
        <h2 className="text-2xl font-bold tracking-wide text-blue-900 drop-shadow-sm">
          日付差分計算
        </h2>
        <p className="mt-1 text-right text-sm text-slate-500">
          日数の計算、お任せください。
        </p>
      </div>

      <div className="space-y-4">
        <DateInputField label="開始日" value={startDate} onChange={setStartDate} />
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