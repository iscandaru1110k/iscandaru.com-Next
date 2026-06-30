import type { Metadata } from "next";
import { CONTACT_FORM_URL } from "@/constants/links";
import styles from "./ProfilePage.module.css";

export const metadata: Metadata = {
  title: "Profile | iscandaru",
  description:
    "iscandaruのプロフィールページです。Webサイト制作・Webアプリ開発で大切にしていること、スキル、経験、制作物を紹介しています。",
  alternates: {
    canonical: "/profile",
  },
  openGraph: {
    title: "Profile | iscandaru",
    description:
      "iscandaruのプロフィールページです。Webサイト制作・Webアプリ開発で大切にしていること、スキル、経験、制作物を紹介しています。",
    url: "/profile",
    type: "website",
  },
};

const values = [
  {
    title: "伴走型の開発",
    body: [
      "Webサイトを作ることではなく、「実現したいこと」を一緒に整理しながら形にすることを大切にしています。",
      "専門用語をできるだけ使わず、Webに詳しくない方でも安心して相談できるよう心掛けています。",
    ],
  },
  {
    title: "オーバースペックにしない",
    body: [
      "必要以上に複雑なシステムは提案せず、その方にとって扱いやすく、更新しやすく、長く使えるWebサイト・Webアプリを目指します。",
    ],
  },
  {
    title: "成果物を見ながら進める",
    body: [
      "完成形を最後まで待つのではなく、小さく作り、確認し、改善する流れを大切にしています。",
      "完成後に「イメージと違った」というズレを少なくするため、成果物を確認しながら一緒に進めていきます。",
    ],
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
    title: "Frontend",
    skills: ["React", "Next.js", "TypeScript", "HTML", "CSS", "CSS Modules"],
  },
  {
    title: "Backend",
    skills: ["Java", "Spring Boot", "C#", "Python"],
  },
  {
    title: "Database",
    skills: ["MySQL", "Oracle", "SQL"],
  },
  {
    title: "Infrastructure",
    skills: ["AWS", "Vercel"],
  },
  {
    title: "Development",
    skills: ["Git", "GitHub", "pnpm"],
  },
  {
    title: "Test",
    skills: ["Vitest", "JUnit", "xUnit"],
  },
];

const works = [
  {
    title: "Portfolio Site",
    body: "現在のポートフォリオサイト。Next.jsへのリビルドを進めながら、コンポーネント設計や保守性を意識して開発しています。",
  },
  {
    title: "LABO",
    body: "日常で使える便利ツールをまとめたWebアプリケーションです。",
    items: ["誕生日計算", "日付計算", "その他ツールを順次追加予定"],
  },
  {
    title: "業務開発",
    body: "守秘義務のため、詳細は抽象化して掲載しています。",
    items: [
      "人材紹介系Webシステム開発",
      "AWS環境での開発",
      "新機能開発",
      "保守・運用",
    ],
  },
];

export default function ProfilePage() {
  return (
    <main className={styles.page}>
      <section className={styles.hero}>
        <p className={styles.eyebrow}>PROFILE</p>
        <h1 className={styles.title}>伴走型のWebエンジニア</h1>
        <div className={styles.heroPhilosophies}>
          <section className={styles.heroPhilosophy}>
            <h3 className={styles.heroPhilosophyTitle}>哲学1</h3>
            <p className={styles.lead}>
              Webサイトを作ることではなく、
              <br />
              あなたが「実現したいこと」を一緒に整理して、
              <br />
              分かりやすく形にしていくことを大切にしています。
            </p>
          </section>
          <section className={styles.heroPhilosophy}>
            <h3 className={styles.heroPhilosophyTitle}>哲学2</h3>
            <p className={styles.lead}>
              日常にささやかな豊かさを届けることをテーマに、
              <br />
              小さく始めて、相談しながら育てていけるWebサイト・Webアプリを作っています。
            </p>
          </section>
          <section className={styles.heroPhilosophy}>
            <h3 className={styles.heroPhilosophyTitle}>哲学3</h3>
            <p className={styles.lead}>
              Webに詳しくない方でも安心して相談できる、
              声のかけやすいWebエンジニアを目指しています。
            </p>
          </section>
        </div>
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
          <p>趣味は音楽、ディズニー、料理、ダーツ、漫画など幅広め。</p>
          <p>「人生幅広くゆったりと」をモットーに楽しんでいます。</p>
        </div>
      </section>

      <section className={styles.section} aria-labelledby="values-heading">
        <h2 id="values-heading" className={styles.sectionTitle}>
          大切にしていること
        </h2>
        <div className={`${styles.grid} ${styles.threeColumns}`}>
          {values.map((value) => (
            <article key={value.title} className={styles.card}>
              <h3 className={styles.cardTitle}>{value.title}</h3>
              {value.body.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </article>
          ))}
        </div>
      </section>

      <section className={styles.section} aria-labelledby="services-heading">
        <h2 id="services-heading" className={styles.sectionTitle}>
          Services
        </h2>
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

      <section className={styles.section} aria-labelledby="skills-heading">
        <h2 id="skills-heading" className={styles.sectionTitle}>
          Skills
        </h2>
        <div className={`${styles.grid} ${styles.threeColumns}`}>
          {skillGroups.map((group) => (
            <article key={group.title} className={styles.card}>
              <h3 className={styles.cardTitle}>{group.title}</h3>
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
            Reactを用いたToC向けWebアプリケーションの新規画面開発を担当。画面設計から実装まで一貫して対応しています。
          </p>
          <p>
            Spring
            Bootを中心に、API設計、エンドポイント実装、SQL作成、データベース連携まで一貫して担当できます。
          </p>
        </div>
      </section>

      <section className={styles.section} aria-labelledby="works-heading">
        <h2 id="works-heading" className={styles.sectionTitle}>
          Works
        </h2>
        <div className={`${styles.grid} ${styles.twoColumns}`}>
          {works.map((work) => (
            <article key={work.title} className={styles.card}>
              <h3 className={styles.cardTitle}>{work.title}</h3>
              <p>{work.body}</p>
              {work.items && (
                <ul className={styles.list}>
                  {work.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              )}
            </article>
          ))}
        </div>
      </section>

      <section className={styles.section} aria-labelledby="contact-heading">
        <h2 id="contact-heading" className={styles.sectionTitle}>
          Contact
        </h2>
        <div className={styles.contact}>
          <p>
            Web制作やWebアプリ開発について、「こんなこと相談しても大丈夫かな？」という内容でもお気軽にご相談ください。
          </p>
          <p>
            「自分でWebサイトを作ってみたい！ でもどうしたら…」そんな相談でもOK!
          </p>
          <p>まずはお話を伺い、一緒に最適な形を考えます。</p>
          <a
            href={CONTACT_FORM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.contactLink}
          >
            Googleフォームで相談する
          </a>
        </div>
      </section>
    </main>
  );
}
