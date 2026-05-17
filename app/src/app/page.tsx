import Link from "next/link";
import styles from "./HomePage.module.css";

export default function Home() {
  return (
    <main className={styles.page}>
      <h1 className={styles.title}>Home</h1>

      <Link href="/labo" className={styles.link}>
        LABOへ
      </Link>
    </main>
  );
}
