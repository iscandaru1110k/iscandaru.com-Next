import { LaboBackLink } from "@/features/labo/components/LaboBackLink";
import { BirthdayCalculator } from "@/features/labo/birthday/components/BirthdayCalculator";
import styles from "./BirthdayPage.module.css";

export default function Page() {
  return (
    <main className={styles.page}>
      <h1 className={styles.title}>人生カウンター</h1>
      <LaboBackLink />
      <BirthdayCalculator />
    </main>
  );
}
