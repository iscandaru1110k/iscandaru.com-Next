"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { CONTACT_FORM_URL } from "@/constants/links";
import styles from "./Header.module.css";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/profile", label: "Profile" },
  { href: "/labo", label: "LABO" },
  { href: "/privacy", label: "Privacy Policy" },
  { href: CONTACT_FORM_URL, label: "Contact", isExternal: true },
];

export function Header() {
  const pathname = usePathname();

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

      <nav className={styles.nav} aria-label="Main navigation">
        {navItems.map((item) => {
          const isActive = item.isExternal
            ? false
            : item.href === "/"
              ? pathname === item.href
              : pathname.startsWith(item.href);
          const linkClassName = [
            styles.navLink,
            item.isExternal ? styles.contactLink : undefined,
            isActive ? styles.active : undefined,
          ]
            .filter(Boolean)
            .join(" ");

          if (item.isExternal) {
            return (
              <a
                key={item.href}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className={linkClassName}
                aria-label="Contact Googleフォームを新しいタブで開く"
              >
                {item.label}
              </a>
            );
          }

          return (
            <Link
              key={item.href}
              href={item.href}
              className={linkClassName}
              aria-current={isActive ? "page" : undefined}
            >
              {item.label}
            </Link>
          );
        })}
      </nav>
    </header>
  );
}
