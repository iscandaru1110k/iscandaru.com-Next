# ロードマップ（WEB-001 iscandaru.com Creator Site Rebuild）

このファイルは WEB-001 の Project-level Backlog の **正本** とする（`docs/decisions.md` Decision D）。
`tiktok-live-sort-game` 側や `docs/tasks.md` には詳細 Backlog を重複させない。

- 要件: `docs/requirements.md`（Creator Site 要件）
- 判断理由: `docs/decisions.md`（Decision A〜F）

## ステータス

| 項目 | 内容 |
| --- | --- |
| Project | WEB-001 iscandaru.com Creator Site Rebuild |
| 優先度 | NOW（主開発スコープ） |
| 並行作業 | `tiktok-live-sort-game` の Stable Release 確認（実 LIVE での運用観測）。Web 開発の blocker にはしない |

## Phase 一覧

| Phase | 名称 | 対象 repo | 依存 | 状態 |
| --- | --- | --- | --- | --- |
| WEB-P1 | Requirements / IA / Repo Boundary | web | なし | 完了 |
| WEB-P2 | Site Shell / Navigation | web | WEB-P1 | 完了 |
| WEB-P3 | Projects Foundation | web | WEB-P2 | 完了 |
| WEB-P4 | TikTok LIVE Case Study | web（一次情報は app repo を参照） | WEB-P3 | 完了 |
| WEB-P5 | Top Page Rebuild | web | WEB-P4 | 完了 |
| WEB-P6 | Profile Rework | web | WEB-P2（WEB-P4 完了後が望ましい） | 完了 |
| WEB-P7 | Polish / SEO / OGP | web | WEB-P3〜P6 | 未着手 |

- web = `iscandaru.com-Next`
- app = `tiktok-live-sort-game`

各 Phase は 1 つ以上の PR で進める。Phase をまたぐ変更は同じ PR に混ぜない。

WEB-P3〜P6 は例外として、Creator Site Core として同一 PR で実施した。

---

## WEB-P1 Requirements / IA / Repo Boundary

### 目的

Creator Site 化の前提を docs に固定し、以降の実装 PR が迷わないようにする。

### 主な変更

- `docs/requirements.md` に Creator Site 要件（目的・想定訪問者・IA・掲載しない情報）を追加
- `docs/decisions.md` に Decision A〜F を追加
- `docs/roadmap.md` を新設（本ファイル）
- `docs/tasks.md` から古い Backlog を整理
- `AGENTS.md` の Current Scope を Creator Site 向けに更新

### 対象 repo

- web のみ（docs-only）

### 依存関係

- なし

### 完了条件

- docs だけで Creator Site の目的・訪問者・主語（Developer × Creator）が分かる
- `/projects/tiktok-live` が Case Study slug として FIX されている
- 2 repo の責務境界と、自動同期を採用しない理由が残っている
- AGENTS.md が Creator Site 開発を許可し、DB / 認証 / 不要な API などの Out of Scope は維持されている
- 実装コードに変更がない

### 後続（別 PR）

- app repo の `docs/ROADMAP.md` に、WEB-001 の正本が web repo の `docs/roadmap.md` である旨を追記する

---

## WEB-P2 Site Shell / Navigation

### 目的

Creator Site としてのページ追加に耐えられるよう、サイト共通の枠（Header / Footer / ナビゲーション）を整える。

### 主な変更

- ナビゲーションの再設計（Top / Projects / Profile / LABO を軸にする）
- モバイルナビの修正
- TikTok プロフィールへのリンクを定数化し、複数箇所から同じ値を参照する
- Privacy を一次ナビから整理（Footer などの二次導線へ）
- sitemap 等の基盤整理（新ルート追加に備える）

### 対象 repo

- web

### 依存関係

- WEB-P1

### 完了条件

- デスクトップ / モバイルでナビゲーションが正しく動作する
- TikTok リンクが 1 箇所の定数から参照されている
- Privacy へは二次導線から到達できる
- 既存ルート（`/`, `/profile`, `/labo`, `/labo/*`, `/privacy`）が壊れていない
- `pnpm lint` / `pnpm typecheck` / `pnpm test:run` が通る

---

## WEB-P3 Projects Foundation

### 目的

`/projects` 配下にプロジェクトを掲載するための土台を作る。

### 主な変更

- `/projects` ルートの追加
- project content model（リポジトリ内の静的データとして定義。DB / API は使わない）
- Project Card コンポーネント
- metadata / sitemap との連携

### 対象 repo

- web

### 依存関係

- WEB-P2

### 完了条件

- `/projects` に Project Card の一覧が表示される
- project データの追加がデータ定義の追記だけで済む
- `/projects` が metadata と sitemap に反映されている
- 既存ルートが壊れていない
- `pnpm lint` / `pnpm typecheck` / `pnpm test:run` が通る

---

## WEB-P4 TikTok LIVE Case Study

### 目的

`/projects/tiktok-live` で TikTok LIVE アプリを詳しく紹介し、視聴者と技術関係者の双方に伝わる Case Study を作る。

### 主な変更

- `/projects/tiktok-live` ルートの追加
- TikTok LIVE アプリ紹介（ソート可視化から複数の視聴者参加型ゲームへ発展した開発ストーリー）
- Featured Modes
- LIVE Interaction（視聴者がどう参加するか）
- Technical Challenges
- Architecture / Tech Stack
- Development Process
- Gallery
- CTA（TikTok フォロー / LIVE 視聴 / 相談）

### 対象 repo

- web（実装）
- app（一次情報の参照のみ。app repo 側の変更は行わない）

### 依存関係

- WEB-P3
- 掲載内容は app repo の一次情報を手動で公開用に編集して反映する（Decision E）

### 完了条件

- `/projects/tiktok-live` が表示され、`/projects` から遷移できる
- `Sort Arena LIVE` をサイト全体の正式名称として固定していない
- `docs/requirements.md` の「掲載しない情報」に該当する内容が含まれていない
- 掲載画像に視聴者の userId / nickname / アイコンが映り込んでいない
- 動画 / BGM / TikTok artwork は権利確認済みのもののみ使用している
- metadata と sitemap に反映されている
- `pnpm lint` / `pnpm typecheck` / `pnpm test:run` が通る

---

## WEB-P5 Top Page Rebuild

### 目的

トップページを Developer × Creator として再構成し、TikTok から来た視聴者が短時間で「誰のサイトか」「何を作っているか」を理解できるようにする。

### 主な変更

- Hero（Developer × Creator のメッセージ）
- Featured Modes（Case Study への導線）
- TikTok CTA
- Developer 実績
- Contact 導線

### 対象 repo

- web

### 依存関係

- WEB-P4（Featured Modes / CTA のリンク先として Case Study が必要）

### 完了条件

- ファーストビューで Developer × Creator であることが伝わる
- `/projects/tiktok-live` と TikTok へ遷移できる
- 受託相談の導線が下位導線として残っている
- LABO への導線が維持されている
- `pnpm lint` / `pnpm typecheck` / `pnpm test:run` が通る

---

## WEB-P6 Profile Rework

### 目的

Profile を Creator 活動と Developer 実績の両方が伝わる構成へ再編する。

### 主な変更

- Creator 活動（TikTok LIVE 配信）の紹介を追加
- Developer 実績の整理（Projects への導線を含む）
- 既存の「伴走型Webエンジニア」「Web制作相談」の文脈を Services / Contact として整理

### 対象 repo

- web

### 依存関係

- WEB-P2
- WEB-P4 完了後が望ましい（Projects への導線を張るため）

### 完了条件

- Profile で Creator 活動と Developer 実績の両方が確認できる
- 開発相談への導線が残っている
- `/profile` の URL が変わっていない
- `pnpm lint` / `pnpm typecheck` / `pnpm test:run` が通る

---

## WEB-P7 Polish / SEO / OGP

### 目的

公開品質を整える。

### 主な変更

- OGP（ページ別の OGP 画像・説明文）
- SEO（title / description の見直し）
- sitemap の最終確認
- responsive 対応の確認・修正
- accessibility の確認・修正
- performance の確認・改善
- `docs/design-system.md` への追記

### 対象 repo

- web

### 依存関係

- WEB-P3〜P6

### 完了条件

- 全公開ページに適切な title / description / OGP が設定されている
- sitemap に全公開ルートが含まれている
- 主要ページがモバイル / デスクトップで崩れない
- 追加したデザインルールが `docs/design-system.md` に反映されている
- `pnpm lint` / `pnpm typecheck` / `pnpm test:run` / `pnpm build` が通る
