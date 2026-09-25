import type { Metadata } from "next";
import { createPageMetadata } from "@/constants/seo";
import { LaboBackLink } from "@/features/labo/components/LaboBackLink";
import { CountdownCalculator } from "@/features/labo/countdown/components/CountdownCalculator";
import styles from "./CountdownPage.module.css";

export const metadata: Metadata = createPageMetadata({
  title: "カウントダウン",
  description: "今日から目標日までの日数、または経過日数を計算するLABOツールです。",
  path: "/labo/countdown",
});

export default function Page() {
  return (
    <main className={styles.page}>
      <h1 className={styles.title}>カウントダウン</h1>
      <LaboBackLink />
      <CountdownCalculator />
    </main>
  );
}
