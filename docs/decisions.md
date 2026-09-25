# 意思決定ログ

このファイルには、開発中の判断と理由を記録する。

## 2026-05-04: Next.js App Router + TypeScript で再構築する

### 決定

旧アプリを Flask から移植するのではなく、Next.js App Router + TypeScript で作り直す。

### 理由

- 既存アプリはすでに閉鎖済みであり、互換性を強く意識する必要がない
- React / TypeScript の設計練習になる
- 小規模アプリとして保守しやすい構成にしやすい

---

## 2026-05-04: 初期スコープは labo 機能のみとする

### 決定

初期段階では、labo 機能のみを実装する。

対象:

- 人生カウンター
- 日付差分計算

### 理由

- 最初から機能を広げると設計が重くなるため
- 小さく完成させることで、設計・実装・改善のサイクルを回しやすくするため

---

## 2026-05-04: DB と認証は導入しない

### 決定

初期段階では DB と認証を使わない。

### 理由

- 今回の機能はユーザーごとの永続データを必要としない
- 認証を入れると実装範囲が広がりすぎる
- まずは画面とロジックの設計に集中したい

---

## 2026-05-04: 状態管理は useState のみとする

### 決定

初期段階では、状態管理ライブラリを使わず `useState` のみで実装する。

### 理由

- 画面が小さく、グローバル状態が不要
- 状態管理ライブラリを導入すると構成が過剰になる
- React の基本に沿った実装にするため

---

## 2026-05-04: Tailwind CSS は初期導入しない

### 決定

初期段階では Tailwind CSS を使わない。

### 理由

- 今回は UI 作り込みよりも設計とロジック分離を優先する
- 外部ライブラリを最小限にしたい
- まずは `globals.css` で十分対応できる

---

## 2026-05-04: API 化は後回しにする

### 決定

日付計算処理は API 化せず、フロントエンド内の純粋関数として実装する。

### 理由

- 日付計算はサーバー処理にする必要がない
- API 化するとファイル数と設計判断が増える
- まずはシンプルに動くものを作る

---

## 2026-09-25: WEB-001 Creator Site Rebuild の基本方針（WEB-P1）

以下の Decision A〜F は WEB-P1 で FIX した。
これにより「2026-05-04: 初期スコープは labo 機能のみとする」は初期段階の判断として役目を終え、現在のスコープは Creator Site 全体とする。
一方で「DB と認証は導入しない」「状態管理は useState のみとする」「API 化は後回しにする」は引き続き有効とする。

---

## 2026-09-25: Decision A - Creator Site は Projects / Case Study 型を採用する

### 決定

TikTok LIVE アプリを Profile の Works だけに押し込まず、以下のルートを持つ Projects / Case Study 型の構成とする。

```txt
/projects
/projects/tiktok-live
```

### 理由

- TikTok LIVE アプリは複数モード・LIVE 連携・技術的な工夫を持ち、Profile の一項目では情報量が足りない
- TikTok 視聴者と技術関係者の双方が、1 つの URL で詳しい情報へ到達できるようにしたい
- 今後プロジェクトが増えても `/projects` 配下に追加できる

---

## 2026-09-25: Decision B - サイト全体の主語を Developer × Creator とする

### 決定

サイト全体の最上位コンセプトを **Developer × Creator** とする。
受託向けメッセージ（伴走型Webエンジニア / Web制作相談）は残すが、Profile / Services / Contact などの下位導線へ整理し、サイト全体の最上位コンセプトにはしない。

### 理由

- 主な流入元が TikTok になるため、視聴者が最初に知りたいのは「誰が何を作って配信しているか」である
- 開発者であり配信者でもある点が、他のエンジニアサイトとの差別化になる
- 受託相談の導線は残すことで、既存の目的も損なわない

---

## 2026-09-25: Decision C - TikTok LIVE Case Study の slug は `/projects/tiktok-live` とする

### 決定

TikTok LIVE アプリの Case Study の URL は `/projects/tiktok-live` で固定する。
`Sort Arena LIVE` は現時点で Web 側の固定正式名称にしない。

### 理由

- 現在は 6 モードのうち複数が Sort を使わない独立ゲームであり、`Sort Arena LIVE` という名称だけではプロダクト全体を正確に表現しづらい
- プロダクト名が今後変わっても URL を変えずに済むよう、名称ではなくプラットフォーム（TikTok LIVE）を slug にする
- Case Study では「ソート可視化から始まり、複数の視聴者参加型ゲームを持つインタラクティブアプリへ発展した」という開発ストーリーを扱う

---

## 2026-09-25: Decision D - WEB-001 の Project Backlog 正本は `docs/roadmap.md` とする

### 決定

WEB-001 の Project-level Backlog（WEB-P1〜P7）の正本は `iscandaru.com-Next/docs/roadmap.md` とする。
`tiktok-live-sort-game` 側には詳細 Backlog を重複させず、参照リンク程度に留める。
`docs/tasks.md` は Backlog を持たず、roadmap.md への案内と一時的な小タスクのみを置く。

### 理由

- Backlog が複数箇所にあると、どちらが最新か分からなくなる
- Web サイトの作業は本リポジトリで行うため、本リポジトリに正本を置くのが自然

---

## 2026-09-25: Decision E - 2 リポジトリは手動同期とし、自動同期は採用しない

### 決定

2 リポジトリの関係を以下とする。

- `tiktok-live-sort-game`（app repo）: TikTok LIVE アプリに関する一次情報の Source of Truth
  - モード仕様 / Gameplay / LIVE 連携仕様 / 技術構成 / Feature SPEC / Architecture / 公開可否判断の根拠 / 開発規模の元情報 / 実 LIVE 観測データ
- `iscandaru.com-Next`（web repo）: 外部公開用に編集した情報と Creator Site 自体の Source of Truth
  - WEB-001 Project Backlog / Creator Site requirements / Information Architecture / Web 側 decisions / Projects・Case Study 構成 / 公開用説明文 / Web 掲載用画像 / SEO・OGP / Top・Profile・Projects・Contact 設計

同期は手動で行う。以下は採用しない。

- git submodule
- npm package 化
- GitHub API での動的取得
- build 時の別 repo 参照
- API 経由の同期

### 理由

- Web に載せる情報は、一次情報をそのまま転記するのではなく、公開用に取捨選択・編集したものである
- app repo には userId やログ、内部接続情報など公開できない情報が含まれるため、機械的な連携は漏えいリスクを増やす
- 自動同期は build 構成・認証情報・依存関係を増やし、本プロジェクトの「シンプル最優先」と衝突する
- 更新頻度が低く、現時点では手動同期のコストの方が小さい

乖離が実際に運用問題になった場合のみ、自動化を再検討する。

### 運用（2026-09-25 WEB-P7 で追記）

- TikTok LIVE Case Study（`/projects/tiktok-live`）の内容は、app repo の一次情報を確認して web repo へ手動で反映する
  - 反映先: `app/src/features/projects/tiktok-live/data/caseStudy.ts`
- `300+ Updates`・Game Modes 数などの公開数値も自動取得しない（GitHub API / build 時集計は使わない）
  - 必要になったときに app repo の値を確認して手動で更新し、表記は「2026年9月時点」のように時点を添える
  - 数値は PR 数そのものではなく、利用者向けの「アップデート回数」として表現する

---

## 2026-09-25: Decision F - WEB-001 は NOW スコープとして進める

### 決定

`WEB-001 iscandaru.com Creator Site Rebuild` は、TikTok アプリの Stable Release 後ではなく、現在の主開発スコープ（NOW）として進める。

- TikTok アプリ側: Stable Release Gate の確認（数回の実 LIVE）を継続する。新規大型実装は原則抑える
- Web 側: WEB-001 を主開発スコープとして進める

### 理由

- Stable Release Gate の確認は主に実 LIVE での運用観測であり、Web サイト開発とは作業が競合しない
- TikTok からの流入先となる公式サイトを早く整えたい

Stable Release 確認は Web 開発の blocker にしない。
ただし Case Study にモード数や仕様を記載する場合は、公開時点の app repo の一次情報を確認して反映する。

---

## 2026-09-25: Decision G - OGP はサイト全体で共通の 1 枚を使う

### 決定

OGP 画像は `/images/OGP.png` をサイト全体で共通利用する。Top / Case Study などページ別の OGP 画像は作らない。
各ページの metadata は `createPageMetadata()`（`app/src/constants/seo.ts`）で生成し、共通 OGP・canonical・Twitter Card をそろえる。

### 理由

- ページ数が少なく、ページ別画像の制作・保守コストに見合わない
- Next.js ではページ側で `openGraph` を書くと layout 側の設定（画像を含む）が丸ごと上書きされるため、共通化しないと OGP 画像の付け忘れが起きる
