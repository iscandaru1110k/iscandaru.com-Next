import Link from "next/link";

export default function LaboPage() {
  return (
    <main className="p-4">
      <h1 className="text-xl font-bold mb-4">LABO</h1>

      <ul className="space-y-2">
        <li>
          <Link href="/labo/date-diff" className="text-blue-600 underline">
            日数計算
          </Link>
        </li>
      </ul>
    </main>
  );
}
