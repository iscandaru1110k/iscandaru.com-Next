import Link from "next/link";
import { ButtonHTMLAttributes, ReactNode } from "react";
import styles from "./Button.module.css";

type ButtonProps = {
  // リンク時のアクセシブルネーム（外部リンクで「新しいタブで開く」ことを伝える場合など）
  ariaLabel?: string;
  children: ReactNode;
  className?: string;
  external?: boolean;
  href?: string;
  size?: "md";
  // onDark / onDarkOutline は dark navy 背景（Hero・CTA）の上で使う
  variant?: "primary" | "outline" | "onDark" | "onDarkOutline";
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
  ariaLabel,
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
        aria-label={ariaLabel}
      >
        {children}
      </a>
    );
  }

  if (href) {
    return (
      <Link href={href} className={buttonClassName} aria-label={ariaLabel}>
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

