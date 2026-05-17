import Link from "next/link";

export default function LaboPage() {
  return (
    <main className="p-4">
      <h1 className="text-xl font-bold mb-4">LABO</h1>

      <ul className="space-y-2">
        <li className="rounded-lg border border-slate-200 p-4">
          <Link href="/labo/birthday" className="text-blue-600 underline">
            誕生日計算
          </Link>
          <p>
            生年月日から年齢・生存日数・次の誕生日までの日数を計算します。
          </p>
        </li>
        <li>
          <Link href="/labo/date-diff" className="text-blue-600 underline">
            日数計算
          </Link>
        </li>
      </ul>
    </main>
  );
}
