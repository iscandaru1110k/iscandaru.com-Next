import styles from "./MediaSlot.module.css";

export type Media = {
  // 画面上の説明（placeholder 表示と video の aria-label に使う）
  label: string;
  // 実動画を用意したら public/ 配下のパスを入れる（例: /videos/gatling-defense.mp4）
  src?: string;
  poster?: string;
};

type MediaSlotProps = {
  media: Media;
  // Top では 1 本だけ true にする。false の場合は動画を読み込まず poster のみ表示する
  autoPlay?: boolean;
  className?: string;
};

export function MediaSlot({ media, autoPlay = false, className }: MediaSlotProps) {
  const slotClassName = [styles.slot, className].filter(Boolean).join(" ");

  if (media.src && autoPlay) {
    return (
      <div className={slotClassName}>
        <video
          className={styles.video}
          src={media.src}
          poster={media.poster}
          aria-label={media.label}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
        />
      </div>
    );
  }

  if (media.poster) {
    return (
      <div className={slotClassName}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img className={styles.video} src={media.poster} alt={media.label} />
      </div>
    );
  }

  return (
    <div className={`${slotClassName} ${styles.placeholder}`} role="img" aria-label={`${media.label}（準備中）`}>
      <span className={styles.placeholderBadge} aria-hidden="true">
        VIDEO
      </span>
      <span className={styles.placeholderLabel} aria-hidden="true">
        {media.label}
      </span>
      <span className={styles.placeholderNote} aria-hidden="true">
        Coming soon
      </span>
    </div>
  );
}
