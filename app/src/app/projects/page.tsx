import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { ProjectCard } from "@/features/projects/components/ProjectCard";
import { PROJECTS } from "@/features/projects/data/projects";
import styles from "./ProjectsPage.module.css";
import { createPageMetadata } from "@/constants/seo";

const description =
  "iscandaruの個人開発プロジェクト一覧。TikTok LIVE向けの視聴者参加型ゲームや、日常で使える小さなWebツールを紹介しています。";

export const metadata: Metadata = createPageMetadata({
  title: "Projects",
  description,
  path: "/projects",
});

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
