import Link from "next/link";
import styles from "./LaboBackLink.module.css";

export function LaboBackLink() {
  return (
    <Link href="/labo" className={styles.link}>
      LABO一覧へ戻る
    </Link>
  );
}
