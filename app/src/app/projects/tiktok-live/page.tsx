import type { Metadata } from "next";
import Link from "next/link";
import { CONTACT_FORM_URL, TIKTOK_PROFILE_URL } from "@/constants/links";
import { MediaSlot } from "@/features/projects/components/MediaSlot";
import {
  ARCHITECTURE_FLOW,
  DEVELOPMENT_METRICS,
  DEVELOPMENT_METRICS_AS_OF,
  DEVELOPMENT_PROCESS,
  FEATURED_MODES,
  GALLERY_ITEMS,
  HERO_MEDIA,
  LIVE_INTERACTIONS,
  OTHER_MODES,
  STORY_STEPS,
  TECH_STACK,
  TECHNICAL_CHALLENGES,
  WHAT_I_BUILT,
} from "@/features/projects/tiktok-live/data/caseStudy";
import styles from "./TiktokLivePage.module.css";

const title = "TikTok LIVE Interactive Apps | iscandaru";
const description =
  "TikTok LIVEの視聴者がLIKE・ギフト・コメント・フォローで参加できるゲームアプリのCase Study。ソート可視化から複数のゲームモードへ発展した開発ストーリーと技術的な工夫を紹介します。";

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: "/projects/tiktok-live",
  },
  openGraph: {
    title,
    description,
    url: "/projects/tiktok-live",
    type: "article",
  },
};

const tocItems = [
  { href: "#what", label: "What I Built" },
  { href: "#featured", label: "Featured" },
  { href: "#interaction", label: "LIVE Interaction" },
  { href: "#challenges", label: "Challenges" },
  { href: "#architecture", label: "Architecture" },
  { href: "#process", label: "Process" },
];

export default function TiktokLivePage() {
  return (
    <main className={styles.page}>
      <section className={styles.hero} aria-labelledby="case-study-title">
        <div className={styles.heroText}>
          <p className={styles.heroEyebrow}>Case Study / TikTok LIVE</p>
          <h1 id="case-study-title" className={styles.heroTitle}>
            TikTok LIVE Interactive Apps
          </h1>
          <p className={styles.heroLead}>
            視聴者の LIKE・ギフト・コメントで展開が変わる、TikTok LIVE
            向けの視聴者参加型ゲーム。
          </p>
          <p className={styles.heroRole}>
            企画・開発・配信まで、ひとりで担当する Developer × Creator
            プロジェクトです。
          </p>
          <div className={styles.heroActions}>
            <a
              href={TIKTOK_PROFILE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.primaryCta}
              aria-label="TikTokで配信を見る（新しいタブで開く）"
            >
              TikTokで配信を見る <span aria-hidden="true">↗</span>
            </a>
            <a href="#featured" className={styles.secondaryCta}>
              ゲームを見る
            </a>
          </div>
        </div>
        <MediaSlot media={HERO_MEDIA} autoPlay className={styles.heroMedia} />
      </section>

      <nav className={styles.toc} aria-label="Case Study sections">
        {tocItems.map((item) => (
          <a key={item.href} href={item.href} className={styles.tocLink}>
            {item.label}
          </a>
        ))}
      </nav>

      <section id="what" className={styles.section} aria-labelledby="what-heading">
        <p className={styles.sectionEyebrow}>What I Built</p>
        <h2 id="what-heading" className={styles.sectionTitle}>
          配信の中で、視聴者と一緒に遊ぶためのアプリ
        </h2>
        <ul className={styles.pointGrid}>
          {WHAT_I_BUILT.map((point) => (
            <li key={point.title} className={styles.pointCard}>
              <h3 className={styles.cardTitle}>{point.title}</h3>
              <p>{point.body}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className={styles.section} aria-labelledby="story-heading">
        <p className={styles.sectionEyebrow}>Why I Built It</p>
        <h2 id="story-heading" className={styles.sectionTitle}>
          ソート可視化から、LIVEで遊べるゲームへ
        </h2>
        <ol className={styles.story}>
          {STORY_STEPS.map((step) => (
            <li key={step.label} className={styles.storyStep}>
              <span className={styles.storyLabel} aria-hidden="true">
                {step.label}
              </span>
              <div>
                <h3 className={styles.storyTitle}>{step.title}</h3>
                <p>{step.body}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section
        id="featured"
        className={styles.section}
        aria-labelledby="featured-heading"
      >
        <p className={styles.sectionEyebrow}>Featured Experiences</p>
        <h2 id="featured-heading" className={styles.sectionTitle}>
          注目のゲームモード
        </h2>
        <div className={styles.featuredList}>
          {FEATURED_MODES.map((mode) => (
            <article key={mode.id} id={mode.id} className={styles.featured}>
              <MediaSlot media={mode.media} className={styles.featuredMedia} />
              <div className={styles.featuredBody}>
                <p className={styles.featuredTagline}>{mode.tagline}</p>
                <h3 className={styles.featuredName}>
                  {mode.name}
                  <span className={styles.featuredNameJa}>{mode.nameJa}</span>
                </h3>
                <p>{mode.description}</p>
                <ul className={styles.featuredInteractions}>
                  {mode.interactions.map((interaction) => (
                    <li key={interaction}>{interaction}</li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>

        <h3 className={styles.subTitle}>Other Modes</h3>
        <ul className={styles.otherModes}>
          {OTHER_MODES.map((mode) => (
            <li key={mode.name} className={styles.otherMode}>
              <p className={styles.otherModeName}>
                {mode.name}
                <span className={styles.otherModeNameJa}>{mode.nameJa}</span>
              </p>
              <p>{mode.body}</p>
            </li>
          ))}
        </ul>
      </section>

      <section
        id="interaction"
        className={styles.section}
        aria-labelledby="interaction-heading"
      >
        <p className={styles.sectionEyebrow}>LIVE Interaction</p>
        <h2 id="interaction-heading" className={styles.sectionTitle}>
          視聴者のアクションが、そのままゲームになる
        </h2>
        <ul className={styles.interactionGrid}>
          {LIVE_INTERACTIONS.map((interaction) => (
            <li key={interaction.action} className={styles.interactionCard}>
              <p className={styles.interactionAction}>{interaction.action}</p>
              <p className={styles.interactionViewer}>{interaction.viewer}</p>
              <p className={styles.interactionResult}>{interaction.result}</p>
            </li>
          ))}
        </ul>
      </section>

      <section
        id="challenges"
        className={styles.section}
        aria-labelledby="challenges-heading"
      >
        <p className={styles.sectionEyebrow}>Technical Challenges</p>
        <h2 id="challenges-heading" className={styles.sectionTitle}>
          実際のLIVEで起きる問題と、その解き方
        </h2>
        <ul className={styles.challengeGrid}>
          {TECHNICAL_CHALLENGES.map((challenge) => (
            <li key={challenge.title} className={styles.challengeCard}>
              <h3 className={styles.cardTitle}>{challenge.title}</h3>
              <p className={styles.challengeProblem}>
                <span className={styles.challengeLabel}>Problem</span>
                {challenge.problem}
              </p>
              <p>
                <span className={styles.challengeLabel}>Solution</span>
                {challenge.solution}
              </p>
            </li>
          ))}
        </ul>
      </section>

      <section
        id="architecture"
        className={styles.section}
        aria-labelledby="architecture-heading"
      >
        <p className={styles.sectionEyebrow}>Architecture / Tech Stack</p>
        <h2 id="architecture-heading" className={styles.sectionTitle}>
          LIVEイベントが配信画面に届くまで
        </h2>
        <div className={styles.architecture}>
          <ol className={styles.flow}>
            {ARCHITECTURE_FLOW.map((node) => (
              <li key={node.name} className={styles.flowNode}>
                <span className={styles.flowName}>{node.name}</span>
                <span className={styles.flowNote}>{node.note}</span>
              </li>
            ))}
          </ol>
          <div>
            <h3 className={styles.cardTitle}>Tech Stack</h3>
            <ul className={styles.chipList}>
              {TECH_STACK.map((tech) => (
                <li key={tech} className={styles.chip}>
                  {tech}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section
        id="process"
        className={styles.section}
        aria-labelledby="process-heading"
      >
        <p className={styles.sectionEyebrow}>Development Process</p>
        <h2 id="process-heading" className={styles.sectionTitle}>
          個人開発を、チーム開発のように回す
        </h2>
        <ul className={styles.metrics}>
          {DEVELOPMENT_METRICS.map((metric) => (
            <li key={metric.label} className={styles.metric}>
              <span className={styles.metricValue}>{metric.value}</span>
              <span className={styles.metricLabel}>{metric.label}</span>
            </li>
          ))}
        </ul>
        <p className={styles.metricsNote}>{DEVELOPMENT_METRICS_AS_OF}</p>
        <ul className={styles.processList}>
          {DEVELOPMENT_PROCESS.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>

      <section className={styles.section} aria-labelledby="gallery-heading">
        <p className={styles.sectionEyebrow}>Gallery</p>
        <h2 id="gallery-heading" className={styles.sectionTitle}>
          Gallery
        </h2>
        <ul className={styles.gallery}>
          {GALLERY_ITEMS.map((item) => (
            <li key={item.label}>
              <MediaSlot media={item} />
            </li>
          ))}
        </ul>
      </section>

      <section className={styles.cta} aria-labelledby="cta-heading">
        <h2 id="cta-heading" className={styles.ctaTitle}>
          LIVEで一緒に遊びましょう
        </h2>
        <p className={styles.ctaLead}>
          配信は TikTok で行っています。コラボや開発のご相談もお気軽にどうぞ。
        </p>
        <div className={styles.heroActions}>
          <a
            href={TIKTOK_PROFILE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.primaryCta}
            aria-label="TikTokをフォローする（新しいタブで開く）"
          >
            TikTokをフォロー <span aria-hidden="true">↗</span>
          </a>
          <a
            href={CONTACT_FORM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.secondaryCta}
            aria-label="Contact Googleフォームを新しいタブで開く"
          >
            コラボ・開発の相談 <span aria-hidden="true">↗</span>
          </a>
        </div>
        <Link href="/projects" className={styles.backLink}>
          ← Projects 一覧へ
        </Link>
      </section>
    </main>
  );
}
