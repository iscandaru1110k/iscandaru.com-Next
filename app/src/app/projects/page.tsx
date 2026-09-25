import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { ProjectCard } from "@/features/projects/components/ProjectCard";
import { PROJECTS } from "@/features/projects/data/projects";
import styles from "./ProjectsPage.module.css";

const description =
  "iscandaruのプロジェクト一覧。TikTok LIVE向けの視聴者参加型アプリや、日常で使える小さなWebツールを紹介しています。";

export const metadata: Metadata = {
  title: "Projects | iscandaru",
  description,
  alternates: {
    canonical: "/projects",
  },
  openGraph: {
    title: "Projects | iscandaru",
    description,
    url: "/projects",
    type: "website",
  },
};

export default function ProjectsPage() {
  return (
    <Container as="main" size="lg">
      <p className={styles.eyebrow}>PROJECTS</p>
      <h1 className={styles.title}>Projects</h1>
      <p className={styles.lead}>
        つくって、動かして、配信で使う。個人開発のプロジェクトをまとめています。
      </p>

      <ul className={styles.list}>
        {PROJECTS.map((project, index) => (
          <li key={project.slug}>
            <ProjectCard project={project} featured={index === 0} />
          </li>
        ))}
      </ul>
    </Container>
  );
}
