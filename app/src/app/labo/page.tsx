import Link from "next/link";
import styles from "./LaboPage.module.css";

export default function LaboPage() {
  return (
    <main className={styles.page}>
      <h1 className={styles.title}>LABO</h1>

      <ul className={styles.list}>
        <li className={styles.card}>
          <Link href="/labo/birthday" className={styles.link}>
            誕生日計算
          </Link>
          <p className={styles.description}>
            生年月日から年齢・生存日数・次の誕生日までの日数を計算します。
          </p>
        </li>
        <li className={styles.card}>
          <Link href="/labo/date-diff" className={styles.link}>
            日数計算
          </Link>
          <p className={styles.description}>
            2つの日付から日数の差分を計算します。
          </p>
        </li>
      </ul>
    </main>
  );
}
