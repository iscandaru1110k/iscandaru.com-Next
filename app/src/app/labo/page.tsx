import type { Metadata } from "next";
import Link from "next/link";
import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import styles from "./LaboPage.module.css";

export const metadata: Metadata = {
  title: "LABO | iscandaru",
  description:
    "誕生日計算、日数計算、日付計算、カウントダウンなど、日常で使える小さなWebツールをまとめたLABOページです。",
  alternates: {
    canonical: "/labo",
  },
  openGraph: {
    title: "LABO | iscandaru",
    description:
      "誕生日計算、日数計算、日付計算、カウントダウンなど、日常で使える小さなWebツールをまとめたLABOページです。",
    url: "/labo",
    type: "website",
  },
};

export default function LaboPage() {
  return (
    <Container as="main" size="md">
      <h1 className={styles.title}>LABO</h1>

      <ul className={styles.list}>
        <Card as="li" padding="card" radius="lg">
          <Link href="/labo/birthday" className={styles.link}>
            人生カウンター
          </Link>
          <p className={styles.description}>
            生年月日から年齢・生存日数・次の誕生日までの日数を計算します。
          </p>
        </Card>
        <Card as="li" padding="card" radius="lg">
          <Link href="/labo/date-diff" className={styles.link}>
            日数計算
          </Link>
          <p className={styles.description}>
            2つの日付から日数の差分を計算します。
          </p>
        </Card>
        <Card as="li" padding="card" radius="lg">
          <Link href="/labo/date-addition" className={styles.link}>
            日付計算
          </Link>
          <p className={styles.description}>
            基準日から指定した日数を足して、結果の日付を計算します。
          </p>
        </Card>
        <Card as="li" padding="card" radius="lg">
          <Link href="/labo/countdown" className={styles.link}>
            カウントダウン
          </Link>
          <p className={styles.description}>
            今日から目標日までの日数、または経過日数を計算します。
          </p>
        </Card>
      </ul>
    </Container>
  );
}
