import { Button } from "@/components/ui/Button";
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
        <div className={styles.actions}>
          <Button href="/" className={styles.link}>
            Homeへ戻る
          </Button>
          <Button href="/profile" variant="outline" className={styles.link}>
            Profileを見る
          </Button>
          <Button href="/labo" variant="outline" className={styles.link}>
            LABOを見る
          </Button>
        </div>
      </section>
    </main>
  );
}
