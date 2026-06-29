import Link from "next/link";
import styles from "./HomePage.module.css";

const ctaLinks = [
  { href: "/profile", label: "Profile" },
  { href: "/profile#skills-heading", label: "Skills" },
  { href: "/labo", label: "LABO" },
  { href: "/profile#contact-heading", label: "Contact" },
];

const serviceKeywords = ["Webサイト", "Webアプリ", "リニューアル"];

const navigationCards = [
  {
    href: "/profile",
    title: "Profile",
    description: "人となり・経歴を見る",
  },
  {
    href: "/profile#skills-heading",
    title: "Skills",
    description: "できること・実績を見る",
  },
  {
    href: "/labo",
    title: "LABO",
    description: "技術記事・小さな制作物を見る",
  },
  {
    href: "/profile#contact-heading",
    title: "Contact",
    description: "相談する",
  },
];

export default function Home() {
  return (
    <main className={styles.page}>
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

        <div className={styles.ctaList}>
          {ctaLinks.map((link) => (
            <Link key={link.href} href={link.href} className={styles.ctaLink}>
              {link.label}
            </Link>
          ))}
        </div>
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
          <Link key={card.href} href={card.href} className={styles.card}>
            <span className={styles.cardTitle}>{card.title}</span>
            <span className={styles.cardDescription}>{card.description}</span>
          </Link>
        ))}
      </section>
    </main>
  );
}
