# コーディングルール

## 基本方針

- シンプルな実装を優先する
- 過剰な抽象化を避ける
- 外部ライブラリを安易に追加しない
- まずは動くものを小さく作る

## React / Next.js

- App Router を使う
- `app/` 配下はルーティングとページ構成に集中させる
- 状態管理は原則として `useState` のみを使う
- イベントハンドラや `useState` を使うコンポーネントには `"use client"` を付ける
- Server Component と Client Component の責務を混ぜすぎない

## TypeScript

- `any` は原則使わない
- 型は必要になってから定義する
- 戻り値が複雑になったら `types.ts` に切り出す
- 日付計算ロジックは React に依存させない

## ディレクトリ

- ルーティングは `src/app`
- labo 機能は `src/features/labo`
- 共通コンポーネントは `src/components`
- 日付計算ロジックは `src/features/labo/utils/date.ts`

## 禁止事項

- 初期段階で DB を追加しない
- 初期段階で認証を追加しない
- 初期段階で API Route を追加しない
- 初期段階で状態管理ライブラリを追加しない
- 初期段階で UI ライブラリを追加しない
- 1回しか使わないものを無理に共通化しない

## コミット前確認

- `npm run dev` で起動できる
- `npm run lint` が通る
- 不要な console.log がない
- 変更内容が今回のタスク範囲に収まっている