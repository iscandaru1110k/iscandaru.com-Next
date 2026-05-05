import Link from "next/link";

export default function Home() {
  return (
    <main className="p-4">
      <h1 className="text-xl font-bold mb-4">Home</h1>

      <Link href="/labo" className="text-blue-600 underline">
        LABOへ
      </Link>
    </main>
  );
}
