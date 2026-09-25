import type { Metadata } from "next";
import { createPageMetadata } from "@/constants/seo";
import { LaboBackLink } from "@/features/labo/components/LaboBackLink";
import { DateDiffCalculator } from "@/features/labo/date-diff/components/DateDiffCalculator";
import styles from "./DateDiffPage.module.css";

export const metadata: Metadata = createPageMetadata({
  title: "日数計算",
  description: "2つの日付から日数の差分を計算するLABOツールです。",
  path: "/labo/date-diff",
});

export default function Page() {
  return (
    <main className={styles.page}>
      <h1 className={styles.title}>日数計算</h1>
      <LaboBackLink />
      <DateDiffCalculator />
    </main>
  );
}
