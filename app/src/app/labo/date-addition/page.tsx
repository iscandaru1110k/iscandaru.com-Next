import type { Metadata } from "next";
import { createPageMetadata } from "@/constants/seo";
import { LaboBackLink } from "@/features/labo/components/LaboBackLink";
import { DateAdditionCalculator } from "@/features/labo/date-addition/components/DateAdditionCalculator";
import styles from "./DateAdditionPage.module.css";

export const metadata: Metadata = createPageMetadata({
  title: "日付計算",
  description: "基準日から指定した日数を足して、結果の日付を計算するLABOツールです。",
  path: "/labo/date-addition",
});

export default function Page() {
  return (
    <main className={styles.page}>
      <h1 className={styles.title}>日付計算</h1>
      <LaboBackLink />
      <DateAdditionCalculator />
    </main>
  );
}
