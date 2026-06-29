import Link from "next/link";
import styles from "./NotFoundPage.module.css";

export default function NotFound() {
  return (
    <main className={styles.page}>
      <section className={styles.panel}>
        <p className={styles.code}>404</p>
        <h1 className={styles.title}>ページが見つかりませんでした。</h1>
        <p className={styles.description}>
          お探しのページは削除されたか、URLが変更された可能性があります。
        </p>
        <Link href="/" className={styles.link}>
          トップページへ戻る
        </Link>
      </section>
    </main>
  );
}

