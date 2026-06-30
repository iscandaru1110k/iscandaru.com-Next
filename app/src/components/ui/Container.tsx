import { ElementType, ReactNode } from "react";
import styles from "./Container.module.css";

type ContainerProps = {
  as?: "div" | "main" | "section";
  children: ReactNode;
  className?: string;
  size?: "sm" | "md" | "lg";
};

export function Container({
  as = "div",
  children,
  className,
  size = "md",
}: ContainerProps) {
  const Component = as as ElementType;
  const containerClassName = [styles.container, styles[size], className]
    .filter(Boolean)
    .join(" ");

  return <Component className={containerClassName}>{children}</Component>;
}

