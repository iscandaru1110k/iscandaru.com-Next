"use client";

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
    <div className="mt-5 rounded-xl border-2 border-sky-300 bg-white px-4 py-3 text-center shadow-sm">
      <p className="text-sm text-slate-600">{message}</p>
      <p className="mt-1 text-2xl font-semibold tracking-wide text-blue-900">{valueText}</p>
    </div>
  );
};
