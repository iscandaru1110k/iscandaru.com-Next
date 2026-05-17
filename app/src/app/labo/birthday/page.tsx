import { BirthdayCalculator } from "@/features/labo/birthday/components/BirthdayCalculator";

export default function Page() {
  return (
    <main className="p-4">
      <h1 className="text-xl font-bold mb-4">誕生日計算</h1>
      <BirthdayCalculator />
    </main>
  );
}
