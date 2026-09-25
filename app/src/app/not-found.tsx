import type { Metadata } from "next";
import { Button } from "@/components/ui/Button";
import { SITE_NAME } from "@/constants/seo";
import styles from "./NotFoundPage.module.css";

export const metadata: Metadata = {
  title: { absolute: `ページが見つかりません | ${SITE_NAME}` },
};

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
          <Button href="/projects" variant="outline" className={styles.link}>
            Projectsを見る
          </Button>
          <Button href="/profile" variant="outline" className={styles.link}>
            Profileを見る
          </Button>
        </div>
      </section>
    </main>
  );
}
