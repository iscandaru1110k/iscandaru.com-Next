"use client";

import { useEffect, useRef } from "react";
import styles from "./MediaSlot.module.css";

export type Media = {
  // 画面上の説明（placeholder 表示と video の aria-label に使う）
  label: string;
  // public/ 配下のパス（例: /videos/gatling-defense.mp4）。未設定なら placeholder を表示する
  src?: string;
  poster?: string;
  // 動画の実寸。比率を保ったまま表示し、読み込み前のレイアウトシフトを防ぐ
  width?: number;
  height?: number;
};

type MediaSlotProps = {
  media: Media;
  // "autoplay": 読み込み直後から再生（Top Hero など）。画面外では停止する
  // "inView": 画面内に入ったときだけ読み込み・再生し、外れたら停止
  playback?: "autoplay" | "inView";
  className?: string;
};

// 実寸が未設定の場合は TikTok LIVE の配信画面に合わせて 9:16 とする
const DEFAULT_ASPECT_RATIO = "9 / 16";

export function MediaSlot({
  media,
  playback = "inView",
  className,
}: MediaSlotProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const slotClassName = [styles.slot, className].filter(Boolean).join(" ");
  const aspectRatio =
    media.width && media.height
      ? `${media.width} / ${media.height}`
      : DEFAULT_ASPECT_RATIO;

  useEffect(() => {
    const video = videoRef.current;
    if (!video) {
      return;
    }

    // 動きを減らす設定の場合は自動再生せず、操作バーから手動で再生できるようにする
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      video.pause();
      video.controls = true;
      video.preload = "metadata";
      return;
    }

    // autoplay でも画面外では止め、戻ってきたら再開する（ブラウザが一時停止した場合の復帰も兼ねる）
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // 自動再生がブロックされた場合（Safari の省電力モードなど）は止まったまま表示されるだけなので、失敗は無視する
          video.play().catch(() => {});
        } else {
          video.pause();
        }
      },
      { threshold: 0.25 },
    );
    observer.observe(video);

    return () => observer.disconnect();
  }, [playback, media.src]);

  if (media.src) {
    return (
      <div className={slotClassName}>
        <video
          ref={videoRef}
          className={styles.video}
          style={{ aspectRatio }}
          src={media.src}
          poster={media.poster}
          width={media.width}
          height={media.height}
          aria-label={media.label}
          autoPlay={playback === "autoplay"}
          muted
          loop
          playsInline
          preload={playback === "autoplay" ? "auto" : "none"}
        />
      </div>
    );
  }

  return (
    <div
      className={`${slotClassName} ${styles.placeholder}`}
      style={{ aspectRatio }}
      role="img"
      aria-label={`${media.label}（準備中）`}
    >
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
