import { CountdownCalculator } from "@/features/labo/countdown/components/CountdownCalculator";
import styles from "./CountdownPage.module.css";

export default function Page() {
  return (
    <main className={styles.page}>
      <h1 className={styles.title}>カウントダウン</h1>
      <CountdownCalculator />
    </main>
  );
}

