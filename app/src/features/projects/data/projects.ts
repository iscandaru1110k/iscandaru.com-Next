import type { Project } from "@/features/projects/types/project";

export const PROJECTS: Project[] = [
  {
    slug: "tiktok-live",
    title: "TikTok LIVE Interactive Apps",
    href: "/projects/tiktok-live",
    role: "Main Project",
    summary:
      "TikTok LIVEの視聴者が、LIKEやギフト、コメントで配信中のゲームに参加できるWebアプリ。",
    highlights: [
      "ソートアルゴリズムの可視化から始まり、現在は複数のゲームモードへ発展",
      "Gift / LIKE / Comment / Follow がリアルタイムにゲームへ反映",
      "開発から配信まで自分で行う Developer × Creator プロジェクト",
    ],
    tags: ["TikTok LIVE", "Realtime", "Game", "個人開発"],
  },
  {
    slug: "labo",
    title: "LABO",
    href: "/labo",
    role: "Small Web Tools",
    summary: "日常で使える小さなWebツールをまとめたWebアプリ。",
    highlights: ["人生カウンター・日数計算・日付計算・カウントダウン"],
    tags: ["Next.js", "TypeScript", "Tools"],
  },
];
