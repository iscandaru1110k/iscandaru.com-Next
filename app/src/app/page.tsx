import type { Metadata } from "next";
import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { CONTACT_FORM_URL } from "@/constants/links";
import { SITE_DESCRIPTION, SITE_TITLE } from "@/constants/seo";
import styles from "./HomePage.module.css";

export const metadata: Metadata = {
  title: SITE_TITLE,
  description: SITE_DESCRIPTION,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    url: "/",
    type: "website",
  },
};

const serviceKeywords = ["Webサイト", "Webアプリ", "リニューアル"];

const navigationCards = [
  {
    href: "/profile",
    title: "Profile",
    description: "人となり・経歴を見る",
  },
  {
    href: "/profile#skills",
    title: "Profile / Skills",
    description: "できること・実績を見る",
  },
  {
    href: "/labo",
    title: "LABO",
    description: "ささやかな便利ツールを見る",
  },
  {
    href: CONTACT_FORM_URL,
    title: "Contact",
    description: "Googleフォームで相談する",
    isExternal: true,
  },
];

export default function Home() {
  return (
    <Container as="main" size="lg">
      <section className={styles.hero}>
        <p className={styles.eyebrow}>iscandaru.com</p>
        <h1 className={styles.title}>
          一緒につくる。
          <br />
          一緒に育てる。
        </h1>
        <p className={styles.lead}>
          Webサイト・Webアプリを、作って終わりにせず、長く使える形へ。
        </p>
      </section>

      <section className={styles.keywords} aria-label="Service keywords">
        {serviceKeywords.map((keyword) => (
          <span key={keyword} className={styles.keyword}>
            {keyword}
          </span>
        ))}
      </section>

      <section className={styles.navigation} aria-label="Site navigation">
        {navigationCards.map((card) => (
          <Card
            key={card.href}
            href={card.href}
            external={card.isExternal}
            hover
          >
            <span className={styles.cardTitle}>{card.title}</span>
            <span className={styles.cardDescription}>{card.description}</span>
          </Card>
        ))}
      </section>
    </Container>
  );
}
