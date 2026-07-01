import Link from "next/link";
import { CONTACT_FORM_URL } from "@/constants/links";
import styles from "./Footer.module.css";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/profile", label: "Profile" },
  { href: "/labo", label: "LABO" },
  { href: CONTACT_FORM_URL, label: "Contact", isExternal: true },
  { href: "/privacy", label: "Privacy Policy" },
];

export function Footer() {
  return (
    <footer className={styles.footer}>
      <nav className={styles.nav} aria-label="Footer navigation">
        {navItems.map((item) => (
          item.isExternal ? (
            <a
              key={item.href}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.link}
              aria-label="Contact Googleフォームを新しいタブで開く"
            >
              {item.label}
            </a>
          ) : (
            <Link key={item.href} href={item.href} className={styles.link}>
              {item.label}
            </Link>
          )
        ))}
      </nav>
      <p className={styles.copy}>iscandaru.com</p>
    </footer>
  );
}
