import Link from "next/link";
import type { Project } from "@/features/projects/types/project";
import styles from "./ProjectCard.module.css";

type ProjectCardProps = {
  project: Project;
  featured?: boolean;
};

export function ProjectCard({ project, featured = false }: ProjectCardProps) {
  const className = [styles.card, featured ? styles.featured : undefined]
    .filter(Boolean)
    .join(" ");

  return (
    <article className={className}>
      <p className={styles.role}>{project.role}</p>
      <h2 className={styles.title}>
        <Link href={project.href} className={styles.titleLink}>
          {project.title}
        </Link>
      </h2>
      <p className={styles.summary}>{project.summary}</p>
      <ul className={styles.highlights}>
        {project.highlights.map((highlight) => (
          <li key={highlight}>{highlight}</li>
        ))}
      </ul>
      <ul className={styles.tags} aria-label="Tags">
        {project.tags.map((tag) => (
          <li key={tag} className={styles.tag}>
            {tag}
          </li>
        ))}
      </ul>
      <span className={styles.more} aria-hidden="true">
        詳しく見る →
      </span>
    </article>
  );
}
