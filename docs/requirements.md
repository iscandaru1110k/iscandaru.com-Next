# 要件定義

## 背景

旧アプリは Flask + HTML/CSS/JS で構築していたが、現在は閉鎖済み。
今回は既存コードをそのまま移植するのではなく、Next.js App Router + TypeScript で再構築する。

## 目的

- Next.js App Router + TypeScript でシンプルに作り直す
- 保守性の高い構成にする
- 設計力を身につける
- 小さく作って動かしながら改善する

## 初期スコープ

初期リリースでは `labo` 機能のみを対象とする。

プロフィールページも公開し、閲覧者が提供できる価値を短時間で理解できるようにする。

### labo機能

- 人生カウンター
- 日付差分計算
- 日付計算
- カウントダウン

## 非機能要件

- シンプル最優先
- 外部ライブラリは最小限にする
- 状態管理は `useState` のみを使う
- App Routerの標準的な構成に従う
- 計算ロジックは画面から分離する

## 初期段階でやらないこと

- DB
- 認証
- 複雑な状態管理
- API化
- Docker
- 過度な共通化
- UIコンポーネントライブラリの導入

## 完了条件

初期段階では、以下を満たせば完了とする。

- トップページから `labo` ページに遷移できる
- Header / Footer からプロフィールページに遷移できる
- 人生カウンターができる
- 日付差分計算ができる
- 基準日と日数から日付計算ができる
- 今日と目標日からカウントダウンができる
- 計算ロジックがコンポーネントから分離されている
- `npm run dev` でローカル起動できる

---

## Creator Site 要件（WEB-001）

> 2026-09-25 追加。上記の初期スコープ（LABO / Profile）は達成済みとして維持し、以降は Creator Site 化を主開発スコープとする。
> Phase 単位の計画は `docs/roadmap.md` を正本とする。判断理由は `docs/decisions.md` を参照。

### サイトの主語

`iscandaru.com` は、TikTok LIVE で視聴者参加型アプリを開発・配信する **Developer × Creator** の公式サイトとする。

- トップページでは、以下が短時間で伝わることを目指す
  - TikTok LIVE 向けの視聴者参加型アプリを作っている
  - 自分自身でも配信している
  - 開発者でもあり Creator でもある
- 現行の「伴走型Webエンジニア」「Web制作相談」の文脈は廃止しない。ただしサイト全体の最上位メッセージにはせず、Profile / Services / Contact などの下位導線へ整理する

### サイトの目的（優先順）

1. TikTok から来た視聴者が「誰のサイトか」「何を作っているか」を理解できる
2. TikTok LIVE アプリについて詳しく知れる
3. Developer としての技術実績を確認できる
4. 配信・コラボ・開発相談へ進める
5. LABO など既存コンテンツも維持する

### 想定訪問者

| 訪問者 | 主な流入元 | 知りたいこと | 主な導線 |
| --- | --- | --- | --- |
| TikTok 視聴者 | TikTok プロフィール / LIVE | 誰が作っているか、どんなゲームがあるか | Top → `/projects/tiktok-live` → TikTok |
| 開発案件の依頼者 | 検索 / 紹介 / SNS | 何が作れるか、相談できるか | Top → Projects → Profile / Contact |
| 同業エンジニア / 採用・技術関係者 | SNS / 検索 / GitHub | 技術構成、設計判断、開発プロセス | `/projects/tiktok-live` → Profile |

### 情報設計（IA）

将来的なサイト構成は以下を想定する。`（新設予定）` のルートは未実装であり、WEB-P3 以降で追加する。

```txt
/                      Top（Developer × Creator として再構成予定）
/projects              Projects 一覧（新設予定）
/projects/tiktok-live  TikTok LIVE アプリ Case Study（新設予定）
/profile               Profile（Creator 活動 + Developer 実績へ再編予定）
/labo                  LABO（既存・維持）
/labo/*                LABO 各ツール（既存・維持）
/privacy               Privacy（既存・維持。一次ナビからは整理予定）
```

- TikTok LIVE アプリは Profile の Works に押し込まず、独立した Case Study ページとして扱う
- Case Study の slug は `/projects/tiktok-live` で固定する
- `Sort Arena LIVE` は現時点で Web 側の固定正式名称にしない
- Case Study では「ソート可視化から始まり、現在は複数の視聴者参加型ゲームを持つ TikTok LIVE 向けインタラクティブアプリへ発展した」という開発ストーリーを扱える構成にする
- Services / Contact を独立ページにするかは未決とし、WEB-P5 / WEB-P6 の設計時に判断する

### 情報の出所と同期

- TikTok LIVE アプリに関する一次情報（モード仕様、Gameplay、LIVE 連携仕様、技術構成、Feature SPEC、Architecture、公開可否判断の根拠、開発規模、実 LIVE 観測データ）の Source of Truth は `tiktok-live-sort-game` リポジトリとする
- 本リポジトリ（`iscandaru.com-Next`）は、外部公開用に編集した情報と Creator Site 自体の Source of Truth とする
- 同期は手動で行う。自動同期（git submodule / npm package 化 / GitHub API での動的取得 / build 時の別 repo 参照 / API 経由の同期）は行わない

### 掲載しない情報

以下は Web へ掲載しない。Case Study やスクリーンショット作成時も同様に扱う。

- userId
- nickname を含む生ログ
- `logs/` 配下の内容
- `_analysis/` 配下の内容
- 配信別の非公開 LIVE 分析データ
- Sign API provider など内部接続情報
- tunnel hostname
- env の値
- 出所不明の動画 / BGM
- 権利確認できていない TikTok artwork の転載

スクリーンショットや画像を掲載する場合は、視聴者の userId / nickname / アイコンが映り込んでいないことを確認する。

### Creator Site 化でも維持する制約

- DB / 認証 / 不要な API routes は導入しない
- 状態管理ライブラリや大型 UI フレームワークは導入しない
- Projects のコンテンツは、まずリポジトリ内の静的データとして扱う
- 既存の LABO 機能・既存ルートを壊さない
