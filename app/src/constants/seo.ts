import type { Metadata } from "next";

export const SITE_URL = "https://iscandaru.com";

export const SITE_NAME = "iscandaru.com";

export const SITE_TITLE = "iscandaru.com | Developer × Creator";

export const SITE_DESCRIPTION =
  "TikTok LIVEで視聴者参加型ゲームを開発・配信する Developer × Creator、iscandaruの公式サイト。TikTok LIVEゲームのCase Study、個人開発のProjects、Webサイト・Webアプリ開発のご相談窓口をまとめています。";

// OGP はサイト全体で共通の 1 枚を使う（docs/decisions.md 参照）
export const OGP_IMAGE = {
  url: "/images/OGP.png",
  width: 1424,
  height: 751,
  alt: SITE_NAME,
};

type PageMetadataInput = {
  // ページ名。Top 以外は「ページ名 | iscandaru.com」になる
  title: string;
  description: string;
  path: string;
  type?: "website" | "article";
};

// ページ側で openGraph / twitter を書くと layout 側の設定（OGP 画像など）が丸ごと上書きされるため、
// 各ページはこの関数で共通項目をそろえる
export function createPageMetadata({
  title,
  description,
  path,
  type = "website",
}: PageMetadataInput): Metadata {
  const fullTitle = path === "/" ? title : `${title} | ${SITE_NAME}`;

  return {
    title: { absolute: fullTitle },
    description,
    alternates: {
      canonical: path,
    },
    openGraph: {
      title: fullTitle,
      description,
      url: path,
      siteName: SITE_NAME,
      locale: "ja_JP",
      type,
      images: [OGP_IMAGE],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [OGP_IMAGE.url],
    },
  };
}
