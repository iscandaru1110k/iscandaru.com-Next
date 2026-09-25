"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { EXTERNAL_NAV_ITEMS, PRIMARY_NAV_ITEMS } from "@/constants/navigation";
import styles from "./Header.module.css";

const NAV_ID = "site-navigation";
const DESKTOP_MEDIA_QUERY = "(min-width: 761px)";

export function Header() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const navRef = useRef<HTMLElement>(null);

  // ページ遷移したらメニューを閉じる
  // pathname の変化に同期させる意図のため、遷移時の 1 回の再レンダーは許容する
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsMenuOpen(false);
  }, [pathname]);

  // メニュー表示中: 背後のスクロール停止 / ESC で閉じる / Tab フォーカスをメニュー内に留める
  useEffect(() => {
    if (!isMenuOpen) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsMenuOpen(false);
        menuButtonRef.current?.focus();
        return;
      }

      if (event.key !== "Tab" || !menuButtonRef.current || !navRef.current) {
        return;
      }

      const focusableElements = [
        menuButtonRef.current,
        ...navRef.current.querySelectorAll<HTMLAnchorElement>("a[href]"),
      ];
      const first = focusableElements[0];
      const last = focusableElements[focusableElements.length - 1];
      const active = document.activeElement;
      const isInside = focusableElements.some((element) => element === active);

      if (event.shiftKey && (active === first || !isInside)) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && (active === last || !isInside)) {
        event.preventDefault();
        first.focus();
      }
    }

    // デスクトップ幅に戻ったらドロワーを閉じる
    const desktopMediaQuery = window.matchMedia(DESKTOP_MEDIA_QUERY);
    function handleMediaChange(event: MediaQueryListEvent) {
      if (event.matches) {
        setIsMenuOpen(false);
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    desktopMediaQuery.addEventListener("change", handleMediaChange);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
      desktopMediaQuery.removeEventListener("change", handleMediaChange);
    };
  }, [isMenuOpen]);

  function closeMenu() {
    setIsMenuOpen(false);
  }

  const navClassName = [styles.nav, isMenuOpen ? styles.navOpen : undefined]
    .filter(Boolean)
    .join(" ");
  const backdropClassName = [
    styles.backdrop,
    isMenuOpen ? styles.backdropVisible : undefined,
  ]
    .filter(Boolean)
    .join(" ");
  const menuButtonClassName = [
    styles.menuButton,
    isMenuOpen ? styles.menuButtonOpen : undefined,
  ]
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
        className={menuButtonClassName}
        aria-expanded={isMenuOpen}
        aria-controls={NAV_ID}
        aria-label="メニュー"
        onClick={() => setIsMenuOpen((isOpen) => !isOpen)}
      >
        <span className={styles.menuIcon} aria-hidden="true">
          <span className={styles.menuLine} />
          <span className={styles.menuLine} />
          <span className={styles.menuLine} />
        </span>
      </button>

      <div
        className={backdropClassName}
        aria-hidden="true"
        onClick={closeMenu}
      />

      <nav
        ref={navRef}
        id={NAV_ID}
        className={navClassName}
        aria-label="Main navigation"
      >
        <p className={styles.drawerLabel} aria-hidden="true">
          Navigation
        </p>

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
