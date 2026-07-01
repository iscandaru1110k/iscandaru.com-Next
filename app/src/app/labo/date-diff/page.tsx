import { LaboBackLink } from "@/features/labo/components/LaboBackLink";
import { DateDiffCalculator } from "@/features/labo/date-diff/components/DateDiffCalculator";
import styles from "./DateDiffPage.module.css";

export default function Page() {
  return (
    <main className={styles.page}>
      <h1 className={styles.title}>日数計算</h1>
      <LaboBackLink />
      <DateDiffCalculator />
    </main>
  );
}
