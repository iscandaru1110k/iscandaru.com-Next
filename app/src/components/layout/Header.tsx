import Link from "next/link";
import styles from "./Header.module.css";

export function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <Link href="/" className={styles.brand}>
          iscandaru.com
        </Link>

        <nav className={styles.nav} aria-label="Main navigation">
          <Link href="/" className={styles.navLink}>
            Home
          </Link>
          <Link href="/labo" className={styles.navLink}>
            Labo
          </Link>
        </nav>
      </div>
    </header>
  );
}
