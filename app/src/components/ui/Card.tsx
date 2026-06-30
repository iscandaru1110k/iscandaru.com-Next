import Link from "next/link";
import { ElementType, ReactNode } from "react";
import styles from "./Card.module.css";

type CardProps = {
  as?: "article" | "div" | "li";
  children: ReactNode;
  className?: string;
  external?: boolean;
  hover?: boolean;
  href?: string;
  padding?: "lg" | "card";
  radius?: "md" | "lg";
};

const getClassName = ({
  className,
  hover,
  padding,
  radius,
}: Pick<CardProps, "className" | "hover" | "padding" | "radius">) => {
  return [
    styles.card,
    styles[`padding-${padding}`],
    styles[`radius-${radius}`],
    hover ? styles.hover : undefined,
    className,
  ]
    .filter(Boolean)
    .join(" ");
};

export function Card({
  as = "div",
  children,
  className,
  external = false,
  hover = false,
  href,
  padding = "lg",
  radius = "md",
}: CardProps) {
  const cardClassName = getClassName({ className, hover, padding, radius });

  if (href && external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={cardClassName}
      >
        {children}
      </a>
    );
  }

  if (href) {
    return (
      <Link href={href} className={cardClassName}>
        {children}
      </Link>
    );
  }

  const Component = as as ElementType;

  return <Component className={cardClassName}>{children}</Component>;
}

