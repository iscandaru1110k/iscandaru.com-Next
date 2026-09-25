import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { CONTACT_FORM_URL, TIKTOK_PROFILE_URL } from "@/constants/links";
import styles from "./ProfilePage.module.css";
import { createPageMetadata } from "@/constants/seo";

const description =
  "Developer × Creator、iscandaruのプロフィール。TikTok LIVEでのゲーム開発・配信の活動と、Webエンジニアとしての経歴・スキル、Webサイト・Webアプリ開発のご相談について紹介しています。";

export const metadata: Metadata = createPageMetadata({
  title: "Profile",
  description,
  path: "/profile",
});

const values = [
  {
    title: "実現したいことから考える",
    body: "Webサイトありきではなく、「実現したいこと」を一緒に整理して形にします。専門用語をできるだけ使わず、Webに詳しくない方でも安心して相談できるよう心掛けています。",
  },
  {
    title: "小さく作って改善する",
    body: "完成形を最後まで待たず、小さく作り、確認しながら改善します。成果物を見ながら進めることで、「イメージと違った」というズレを減らします。",
  },
  {
    title: "オーバースペックにしない",
    body: "必要以上に複雑なシステムは提案せず、扱いやすく、更新しやすく、長く使えるWebサイト・Webアプリを目指します。",
  },
];

const services = [
  "コーポレートサイト制作",
  "ポートフォリオサイト制作",
  "小規模Webアプリ開発",
  "既存サイトのリニューアル",
  "レスポンシブ対応",
  "フロントエンド開発",
  "バックエンド開発",
  "保守・改善",
];

const skillGroups = [
  {
    title: "個人開発で使用",
    note: "TikTok LIVE Interactive Apps / このサイト / LABO",
    skills: [
      "TypeScript",
      "React",
      "Next.js",
      "Node.js",
      "Vite",
      "WebSocket",
      "Canvas API",
      "Web Audio API",
      "CSS Modules",
      "Vitest",
      "GitHub Actions",
      "Vercel",
    ],
  },
  {
    title: "業務で使用",
    note: "大規模Webシステムの新機能開発・保守",
    skills: ["React", "Java", "Spring Boot", "AWS"],
  },
  {
    title: "その他の経験",
    note: "言語・DB・テスト・開発ツール",
    skills: [
      "C#",
      "Python",
      "MySQL",
      "Oracle",
      "SQL",
      "JUnit",
      "xUnit",
      "Git",
      "GitHub",
    ],
  },
];

const projects = [
  {
    title: "TikTok LIVE Interactive Apps",
    href: "/projects/tiktok-live",
    body: "TikTok LIVEの視聴者が LIKE・ギフト・コメントで参加できるゲームアプリ。企画・開発・配信まで自分で行っています。",
    items: [
      "Gatling Defense / Dino Runner / Sort Battle など6モード",
      "LIVEイベントとのリアルタイム連携",
    ],
  },
  {
    title: "LABO",
    href: "/labo",
    body: "日常で使える便利ツールをまとめたWebアプリです。",
    items: ["人生カウンター", "日数計算・日付計算", "カウントダウン"],
  },
  {
    title: "業務開発",
    body: "※守秘義務のため、詳細は抽象化して掲載します。",
    items: [
      "人材紹介系Webシステム開発",
      "AWS環境での開発",
      "新機能開発",
      "保守・運用",
    ],
  },
  {
    title: "Portfolio Site",
    body: "このサイト。Next.js で再構築し、Developer × Creator の公式サイトとして育てています。",
  },
];

export default function ProfilePage() {
  return (
    <main className={styles.page}>
      <section className={styles.hero}>
        <p className={styles.eyebrow}>PROFILE</p>
        <h1 className={styles.title}>Developer × Creator</h1>
        <p className={styles.heroLead}>
          Webエンジニアとして働きながら、TikTok LIVE
          で遊べる視聴者参加型ゲームを自分で開発し、自分で配信しています。
        </p>
        <p className={styles.subLead}>
          「つくる」と「届ける」の両方を楽しみながら、Webサイト・Webアプリ開発のご相談も受け付けています。
        </p>
      </section>

      <section className={styles.section} aria-labelledby="about-heading">
        <h2 id="about-heading" className={styles.sectionTitle}>
          About
        </h2>
        <div className={styles.textBlock}>
          <p>北海道出身。</p>
          <p>
            現在は大手SIerでWebエンジニアとしてWebシステム開発に従事しています。
          </p>
          <p>
            業務ではフロントエンド・バックエンドを問わず設計から実装まで幅広く担当し、
            <br />
            休日は個人開発を通じて新しい技術のキャッチアップやサービス制作に取り組んでいます。
          </p>
          <p>
            2026年からは TikTok LIVE
            向けの視聴者参加型ゲームアプリを開発し、自分の配信で視聴者と一緒に遊んでいます。
          </p>
          <p>趣味は音楽、ディズニー、料理、ダーツ、漫画など幅広め。</p>
          <p>「人生幅広くゆったりと」をモットーに楽しんでいます。</p>
        </div>
      </section>

      <section className={styles.section} aria-labelledby="creator-heading">
        <h2 id="creator-heading" className={styles.sectionTitle}>
          Creator
        </h2>
        <div className={styles.creator}>
          <p>
            TikTok LIVE では、自作のゲームを使った配信を行っています。視聴者の
            LIKE やギフトで展開が変わるので、毎回違う展開になります。
          </p>
          <p>配信で見つけた課題を開発に戻し、改善を続けています。</p>
          <div className={styles.creatorActions}>
            <Button
              href={TIKTOK_PROFILE_URL}
              external
              variant="onDark"
              ariaLabel="TikTokを見る（新しいタブで開く）"
            >
              TikTokを見る <span aria-hidden="true">↗</span>
            </Button>
            <Button href="/projects/tiktok-live" variant="onDarkOutline">
              Case Study を読む
            </Button>
          </div>
        </div>
      </section>

      <section className={styles.section} aria-labelledby="projects-heading">
        <h2 id="projects-heading" className={styles.sectionTitle}>
          Projects
        </h2>
        <div className={`${styles.grid} ${styles.twoColumns}`}>
          {projects.map((project) => (
            <article key={project.title} className={styles.card}>
              <h3 className={styles.cardTitle}>
                {project.href ? (
                  <Link href={project.href} className={styles.cardTitleLink}>
                    {project.title} →
                  </Link>
                ) : (
                  project.title
                )}
              </h3>
              <p>{project.body}</p>
              {project.items && (
                <ul className={styles.list}>
                  {project.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              )}
            </article>
          ))}
        </div>
      </section>

      <section
        id="skills"
        className={styles.section}
        aria-labelledby="skills-heading"
      >
        <h2 id="skills-heading" className={styles.sectionTitle}>
          Skills
        </h2>
        <div className={`${styles.grid} ${styles.threeColumns}`}>
          {skillGroups.map((group) => (
            <article key={group.title} className={styles.card}>
              <h3 className={styles.cardTitle}>{group.title}</h3>
              <p className={styles.cardNote}>{group.note}</p>
              <ul className={styles.chipList}>
                {group.skills.map((skill) => (
                  <li key={skill} className={styles.chip}>
                    {skill}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.section} aria-labelledby="experience-heading">
        <h2 id="experience-heading" className={styles.sectionTitle}>
          Experience
        </h2>
        <div className={styles.textBlock}>
          <p>大手SIerにてWebシステム開発に約5年間従事。</p>
          <p>
            React、Javaを用いた大規模Webアプリケーションの新機能開発を担当。画面設計から実装まで一貫して対応しています。
          </p>
          <p>
            Spring
            Bootを中心に、API設計、ビジネスロジック実装、データベース連携までフルスタックで担当できます。
          </p>
        </div>
      </section>

      <section className={styles.section} aria-labelledby="services-heading">
        <h2 id="services-heading" className={styles.sectionTitle}>
          Services
        </h2>
        <p className={styles.sectionLead}>
          Webサイト・Webアプリの制作や、既存サイトの改善のご相談を受け付けています。
        </p>

        <h3 className={styles.subTitle}>大切にしていること</h3>
        <div className={`${styles.grid} ${styles.threeColumns}`}>
          {values.map((value) => (
            <article key={value.title} className={styles.card}>
              <h4 className={styles.cardTitle}>{value.title}</h4>
              <p>{value.body}</p>
            </article>
          ))}
        </div>

        <h3 className={styles.subTitle}>対応できること</h3>
        <div className={styles.card}>
          <ul className={styles.chipList}>
            {services.map((service) => (
              <li key={service} className={styles.chip}>
                {service}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className={styles.section} aria-labelledby="contact-heading">
        <h2 id="contact-heading" className={styles.sectionTitle}>
          Contact
        </h2>
        <div className={styles.contact}>
          <p>
            TikTok LIVE
            でのコラボ・配信企画のご相談、Web制作やWebアプリ開発のご相談を受け付けています。
          </p>
          <p>
            「こんなこと相談しても大丈夫かな？」という内容でもお気軽にどうぞ。
          </p>
          <p>
            「自分でWebサイトを作ってみたい！
            でもどうしたら…」そんな相談でもOK！
          </p>
          <p>まずはお話を伺い、一緒に最適な形を考えます。</p>
          <p className={styles.contactNote}>
            お問い合わせはGoogleフォームで受け付けています。ボタンを押すと別タブでフォームが開きます。
          </p>
          <Button
            href={CONTACT_FORM_URL}
            external
            className={styles.contactButton}
          >
            Googleフォームへ
          </Button>
        </div>
      </section>
    </main>
  );
}
