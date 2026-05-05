import { DateDiffCalculator } from "@/features/labo/date-diff/components/DateDiffCalculator";

export default function Page() {
  return (
    <main className="p-4">
      <h1 className="text-xl font-bold mb-4">日数計算</h1>
      <DateDiffCalculator />
    </main>
  );
}
