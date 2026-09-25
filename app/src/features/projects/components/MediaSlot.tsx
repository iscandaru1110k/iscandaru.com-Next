"use client";

import { useEffect, useRef } from "react";
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
  // "autoplay": 読み込み直後から再生（Top Hero など 1 本だけ）
  // "inView": 画面内に入ったときだけ再生し、外れたら停止
  playback?: "autoplay" | "inView";
  className?: string;
};

export function MediaSlot({
  media,
  playback = "inView",
  className,
}: MediaSlotProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const slotClassName = [styles.slot, className].filter(Boolean).join(" ");

  useEffect(() => {
    const video = videoRef.current;
    if (!video) {
      return;
    }

    // 動きを減らす設定の場合は再生しない（poster / 先頭フレームのまま）
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      video.pause();
      return;
    }

    if (playback === "autoplay") {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // 自動再生がブロックされても表示は poster のまま問題ないため握りつぶす
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
          src={media.src}
          poster={media.poster}
          aria-label={media.label}
          autoPlay={playback === "autoplay"}
          muted
          loop
          playsInline
          preload={playback === "autoplay" ? "auto" : "metadata"}
        />
      </div>
    );
  }

  return (
    <div
      className={`${slotClassName} ${styles.placeholder}`}
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
