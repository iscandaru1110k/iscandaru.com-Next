import type { Metadata } from "next";
import Link from "next/link";
import { CONTACT_FORM_URL, TIKTOK_PROFILE_URL } from "@/constants/links";
import { SITE_DESCRIPTION, SITE_TITLE } from "@/constants/seo";
import { MediaSlot } from "@/features/projects/components/MediaSlot";
import {
  FEATURED_MODES,
  HERO_MEDIA,
} from "@/features/projects/tiktok-live/data/caseStudy";
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

const developerSkills = [
  "TypeScript",
  "React",
  "Next.js",
  "Node.js",
  "WebSocket",
  "Canvas",
  "Java",
  "Spring Boot",
  "AWS",
];

const contactTopics = [
  {
    title: "配信・コラボ",
    body: "TikTok LIVE でのコラボ配信や、ゲームを使った企画のご相談。",
  },
  {
    title: "Web・アプリ開発",
    body: "Webサイト制作、Webアプリ開発、既存サイトの改善のご相談。",
  },
];

export default function Home() {
  return (
    <main className={styles.page}>
      <section className={styles.hero} aria-labelledby="home-title">
        <div className={styles.heroText}>
          <p className={styles.eyebrow}>Developer × Creator</p>
          <h1 id="home-title" className={styles.title}>
            TikTok LIVE で遊べるゲームを、つくって、配信する。
          </h1>
          <p className={styles.lead}>
            視聴者が LIKE・ギフト・コメントで参加できる TikTok LIVE
            向けのゲームを開発し、自分の LIVE で配信しています。
          </p>
          <div className={styles.actions}>
            <a
              href={TIKTOK_PROFILE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.primaryCta}
              aria-label="TikTokで配信を見る（新しいタブで開く）"
            >
              TikTokで配信を見る <span aria-hidden="true">↗</span>
            </a>
            <Link href="/projects/tiktok-live" className={styles.secondaryCta}>
              ゲームを詳しく見る
            </Link>
          </div>
        </div>
        {/* Top で自動再生するのはこの 1 本だけにする */}
        <MediaSlot media={HERO_MEDIA} autoPlay className={styles.heroMedia} />
      </section>

      <section className={styles.section} aria-labelledby="featured-heading">
        <p className={styles.sectionEyebrow}>Featured Project</p>
        <h2 id="featured-heading" className={styles.sectionTitle}>
          TikTok LIVE Interactive Apps
        </h2>
        <p className={styles.sectionLead}>
          ソートアルゴリズムの可視化から始まり、いまは6つのモードを持つ視聴者参加型ゲームに。配信のたびに、視聴者と一緒に遊んでいます。
        </p>
        <ul className={styles.modeList}>
          {FEATURED_MODES.map((mode) => (
            <li key={mode.id}>
              <Link
                href={`/projects/tiktok-live#${mode.id}`}
                className={styles.modeCard}
              >
                <span className={styles.modeName}>{mode.name}</span>
                <span className={styles.modeTagline}>{mode.tagline}</span>
              </Link>
            </li>
          ))}
        </ul>
        <div className={styles.sectionLinks}>
          <Link href="/projects/tiktok-live" className={styles.textLink}>
            Case Study を読む →
          </Link>
          <Link href="/projects" className={styles.textLink}>
            すべての Projects →
          </Link>
        </div>
      </section>

      <section className={styles.section} aria-labelledby="developer-heading">
        <p className={styles.sectionEyebrow}>Developer</p>
        <h2 id="developer-heading" className={styles.sectionTitle}>
          本業は Web エンジニア
        </h2>
        <div className={styles.developer}>
          <p className={styles.sectionLead}>
            SIer で Web システム開発に携わりながら、個人開発では TikTok LIVE
            アプリや LABO のような小さなツールを作っています。設計・テスト・運用まで含めて、長く動かせるものづくりを大切にしています。
          </p>
          <ul className={styles.chipList} aria-label="Skills">
            {developerSkills.map((skill) => (
              <li key={skill} className={styles.chip}>
                {skill}
              </li>
            ))}
          </ul>
          <div className={styles.sectionLinks}>
            <Link href="/profile" className={styles.textLink}>
              Profile を見る →
            </Link>
            <Link href="/labo" className={styles.textLink}>
              LABO を使ってみる →
            </Link>
          </div>
        </div>
      </section>

      <section className={styles.section} aria-labelledby="contact-heading">
        <p className={styles.sectionEyebrow}>Contact</p>
        <h2 id="contact-heading" className={styles.sectionTitle}>
          お気軽にご相談ください
        </h2>
        <ul className={styles.contactList}>
          {contactTopics.map((topic) => (
            <li key={topic.title} className={styles.contactCard}>
              <h3 className={styles.contactTitle}>{topic.title}</h3>
              <p>{topic.body}</p>
              <a
                href={CONTACT_FORM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.contactLink}
                aria-label={`${topic.title}の相談をする（Googleフォームを新しいタブで開く）`}
              >
                相談する <span aria-hidden="true">↗</span>
              </a>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
