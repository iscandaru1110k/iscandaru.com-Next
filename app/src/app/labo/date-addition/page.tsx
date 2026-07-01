import { LaboBackLink } from "@/features/labo/components/LaboBackLink";
import { DateAdditionCalculator } from "@/features/labo/date-addition/components/DateAdditionCalculator";
import styles from "./DateAdditionPage.module.css";

export default function Page() {
  return (
    <main className={styles.page}>
      <h1 className={styles.title}>日付計算</h1>
      <LaboBackLink />
      <DateAdditionCalculator />
    </main>
  );
}
