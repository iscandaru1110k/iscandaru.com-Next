import Link from "next/link";
import {
  EXTERNAL_NAV_ITEMS,
  PRIMARY_NAV_ITEMS,
  PRIVACY_NAV_ITEM,
} from "@/constants/navigation";
import styles from "./Footer.module.css";

const internalNavItems = [...PRIMARY_NAV_ITEMS, PRIVACY_NAV_ITEM];

export function Footer() {
  return (
    <footer className={styles.footer}>
      <nav className={styles.nav} aria-label="Footer navigation">
        {internalNavItems.map((item) => (
          <Link key={item.href} href={item.href} className={styles.link}>
            {item.label}
          </Link>
        ))}
        {EXTERNAL_NAV_ITEMS.map((item) => (
          <a
            key={item.href}
            href={item.href}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.link}
            aria-label={item.ariaLabel}
          >
            {item.label}
          </a>
        ))}
      </nav>
      <p className={styles.copy}>iscandaru.com</p>
    </footer>
  );
}
