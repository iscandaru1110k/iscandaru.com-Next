import Link from "next/link";
import { ButtonHTMLAttributes, ReactNode } from "react";
import styles from "./Button.module.css";

type ButtonProps = {
  children: ReactNode;
  className?: string;
  external?: boolean;
  href?: string;
  size?: "md";
  variant?: "primary" | "outline";
} & ButtonHTMLAttributes<HTMLButtonElement>;

const getClassName = (
  variant: NonNullable<ButtonProps["variant"]>,
  size: NonNullable<ButtonProps["size"]>,
  className?: string,
) => {
  return [styles.button, styles[variant], styles[size], className]
    .filter(Boolean)
    .join(" ");
};

export function Button({
  children,
  className,
  external = false,
  href,
  size = "md",
  variant = "primary",
  ...buttonProps
}: ButtonProps) {
  const buttonClassName = getClassName(variant, size, className);

  if (href && external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={buttonClassName}
      >
        {children}
      </a>
    );
  }

  if (href) {
    return (
      <Link href={href} className={buttonClassName}>
        {children}
      </Link>
    );
  }

  return (
    <button className={buttonClassName} {...buttonProps}>
      {children}
    </button>
  );
}

