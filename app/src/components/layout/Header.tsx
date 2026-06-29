import Image from "next/image";
import Link from "next/link";
import styles from "./Header.module.css";

export function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.brandImages}>
        <Link href="/" className={styles.brandLink} aria-label="Home">
          <Image
            src="/images/logo-mark_base.png"
            alt="logo mark"
            width={60}
            height={69}
            className={styles.mark}
            priority
          />
        </Link>
      </div>

      <div className={styles.titleWrap}>
        <p className={styles.siteTitle}>iscandaru.com</p>
      </div>

      <nav className={styles.nav} aria-label="Main navigation">
        <Link href="/" className={styles.navLink}>
          Home
        </Link>
        <Link href="/profile" className={styles.navLink}>
          Profile
        </Link>
        <Link href="/labo" className={styles.navLink}>
          Labo
        </Link>
      </nav>
    </header>
  );
}
