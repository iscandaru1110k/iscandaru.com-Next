"use client";

import { useState } from "react";
import { calculateDateDiff } from "@/features/labo/utils/date";

export const DateDiffCalculator = () => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const diff = calculateDateDiff(startDate, endDate);

  return (
    <div className="p-4 border rounded-xl max-w-md space-y-4">
      <h2 className="text-lg font-semibold">日付差分計算</h2>

      <div className="flex flex-col">
        <label>開始日</label>
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          className="border p-2 rounded"
        />
      </div>

      <div className="flex flex-col">
        <label>終了日</label>
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          className="border p-2 rounded"
        />
      </div>

      <div>
        <p>
          差分：
          {diff !== null ? `${diff}日` : "-"}
        </p>
      </div>
    </div>
  );
};