"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { EXTERNAL_NAV_ITEMS, PRIMARY_NAV_ITEMS } from "@/constants/navigation";
import styles from "./Header.module.css";

const NAV_ID = "site-navigation";

export function Header() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [menuPathname, setMenuPathname] = useState(pathname);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  // ページ遷移したらメニューを閉じる
  if (menuPathname !== pathname) {
    setMenuPathname(pathname);
    setIsMenuOpen(false);
  }

  useEffect(() => {
    if (!isMenuOpen) {
      return;
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsMenuOpen(false);
        menuButtonRef.current?.focus();
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isMenuOpen]);

  function closeMenu() {
    setIsMenuOpen(false);
  }

  const navClassName = [styles.nav, isMenuOpen ? styles.navOpen : undefined]
    .filter(Boolean)
    .join(" ");

  return (
    <header className={styles.header}>
      <div className={styles.brandImages}>
        <Link href="/" className={styles.brandLink} aria-label="Home">
          <Image
            src="/images/logo-mark_base.png"
            alt="logo mark"
            width={80}
            height={92}
            sizes="80px"
            className={styles.mark}
            priority
          />
        </Link>
      </div>

      <div className={styles.titleWrap}>
        <Link href="/" className={styles.siteTitle} aria-label="Home">
          iscandaru.com
        </Link>
      </div>

      <button
        ref={menuButtonRef}
        type="button"
        className={styles.menuButton}
        aria-expanded={isMenuOpen}
        aria-controls={NAV_ID}
        aria-label="メニュー"
        onClick={() => setIsMenuOpen((isOpen) => !isOpen)}
      >
        <svg
          className={styles.menuIcon}
          viewBox="0 0 24 24"
          aria-hidden="true"
          focusable="false"
        >
          {isMenuOpen ? (
            <path d="M6 6l12 12M18 6L6 18" />
          ) : (
            <path d="M4 7h16M4 12h16M4 17h16" />
          )}
        </svg>
      </button>

      <nav id={NAV_ID} className={navClassName} aria-label="Main navigation">
        <ul className={styles.navList}>
          {PRIMARY_NAV_ITEMS.map((item) => {
            const isActive =
              item.href === "/"
                ? pathname === item.href
                : pathname.startsWith(item.href);
            const linkClassName = [
              styles.navLink,
              isActive ? styles.active : undefined,
            ]
              .filter(Boolean)
              .join(" ");

            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={linkClassName}
                  aria-current={isActive ? "page" : undefined}
                  onClick={closeMenu}
                >
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>

        <ul className={styles.ctaList}>
          {EXTERNAL_NAV_ITEMS.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className={[styles.navLink, styles.ctaLink].join(" ")}
                aria-label={item.ariaLabel}
                onClick={closeMenu}
              >
                {item.label}
                <span className={styles.externalIcon} aria-hidden="true">
                  ↗
                </span>
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
