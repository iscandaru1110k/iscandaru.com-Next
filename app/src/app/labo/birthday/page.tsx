import type { Metadata } from "next";
import { createPageMetadata } from "@/constants/seo";
import { LaboBackLink } from "@/features/labo/components/LaboBackLink";
import { BirthdayCalculator } from "@/features/labo/birthday/components/BirthdayCalculator";
import styles from "./BirthdayPage.module.css";

export const metadata: Metadata = createPageMetadata({
  title: "人生カウンター",
  description: "生年月日から年齢・生存日数・次の誕生日までの日数を計算するLABOツールです。",
  path: "/labo/birthday",
});

export default function Page() {
  return (
    <main className={styles.page}>
      <h1 className={styles.title}>人生カウンター</h1>
      <LaboBackLink />
      <BirthdayCalculator />
    </main>
  );
}
