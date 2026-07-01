# iscandaru.com

個人サイト `iscandaru.com` のリビルドプロジェクトです。

旧版は Flask + HTML/CSS/JavaScript で構築していましたが、現在は Next.js App Router と TypeScript を使い、保守しやすく機能追加しやすい構成へ作り直しています。

## 概要

このリポジトリでは、ポートフォリオサイト本体と、日常で使える小さな Web ツール群を実装しています。

- トップページ
- プロフィールページ
- プライバシーポリシーページ
- LABO ページ
- 日付・日数に関する小さな計算ツール

## 実装済みページ

| パス | 内容 |
| --- | --- |
| `/` | サイトトップ |
| `/profile` | プロフィール、スキル、実績 |
| `/privacy` | プライバシーポリシー |
| `/labo` | 小さな Web ツールの一覧 |
| `/labo/birthday` | 生年月日から年齢・生存日数・次の誕生日までの日数を計算 |
| `/labo/date-diff` | 2つの日付の差分日数を計算 |
| `/labo/date-addition` | 基準日に指定日数を足した日付を計算 |
| `/labo/countdown` | 今日から目標日までの日数、または経過日数を計算 |

## 技術スタック

- Next.js App Router
- React
- TypeScript
- CSS Modules
- Vitest
- ESLint
- pnpm

## ディレクトリ構成

```txt
.
├── README.md
├── docs/
│   ├── coding-rules.md
│   ├── decisions.md
│   ├── design.md
│   ├── design-system.md
│   ├── requirements.md
│   └── tasks.md
└── app/
    ├── package.json
    ├── public/
    └── src/
        ├── app/
        │   ├── labo/
        │   ├── privacy/
        │   ├── profile/
        │   ├── globals.css
        │   ├── layout.tsx
        │   └── page.tsx
        ├── components/
        ├── constants/
        └── features/
            └── labo/
                ├── birthday/
                ├── countdown/
                ├── date-addition/
                ├── date-diff/
                ├── constants/
                └── types/
```

## 設計方針

このプロジェクトでは、学習しながら長く育てられる個人サイトを目指しています。

- ルーティングとページ構成は `app/src/app` に置く
- 機能ごとの UI と計算ロジックは `app/src/features` に置く
- 日付計算などのロジックは React に依存しない純粋関数として実装する
- スタイルは CSS Modules を使い、ページ・コンポーネント単位で管理する
- 共通 UI は必要になった範囲だけ `app/src/components` に切り出す
- 大きな抽象化や過度な共通化は避け、読みやすさを優先する

## 開発環境

アプリ本体は `app/` ディレクトリ配下にあります。

```bash
cd app
pnpm install
pnpm dev
```

開発サーバーは通常 `http://localhost:3000` で起動します。

## 利用できるコマンド

`app/package.json` で定義している主なコマンドです。

| コマンド | 内容 |
| --- | --- |
| `pnpm dev` | 開発サーバーを起動 |
| `pnpm build` | 本番ビルドを実行 |
| `pnpm start` | ビルド済みアプリを起動 |
| `pnpm lint` | ESLint を実行 |
| `pnpm typecheck` | TypeScript の型チェックを実行 |
| `pnpm test` | Vitest をウォッチモードで実行 |
| `pnpm test:run` | Vitest を単発実行 |
| `pnpm check` | lint、typecheck、test:run をまとめて実行 |

## テスト

日付計算や誕生日計算などのロジックは、機能ディレクトリ内にテストを配置しています。

```txt
app/src/features/labo/*/utils/*.test.ts
```

テストは次のコマンドで実行できます。

```bash
cd app
pnpm test:run
```

## ドキュメント

設計や開発ルールは `docs/` 配下にまとめています。

- `docs/requirements.md`: 要件
- `docs/design.md`: 設計
- `docs/design-system.md`: デザインシステム
- `docs/coding-rules.md`: コーディングルール
- `docs/decisions.md`: 技術的な意思決定
- `docs/tasks.md`: タスク管理

## 今後の方針

LABO の小さなツールを追加しながら、ページ構成、UI、テスト、ドキュメントを段階的に整えていきます。
