# 設計メモ

## 技術構成

- Framework: Next.js
- Router: App Router
- Language: TypeScript
- Styling: CSS
- State: useState
- DB: なし
- API: 初期段階では作らない

## ディレクトリ構成

```txt
project-root/
  app/
    src/
      app/
        layout.tsx
        page.tsx
        globals.css
        labo/
          page.tsx

      components/
        Header.tsx

      features/
        labo/
          components/
            BirthdayCalculator.tsx
            DateDiffCalculator.tsx
          utils/
            date.ts
          types.ts

  docs/
    requirements.md
    design.md
    decisions.md

  README.md
```

## ルーティング

```txt
/       トップページ
/labo   labo機能ページ
/labo/date-addition 日付計算ページ
/labo/countdown カウントダウンページ
```

## ページ設計

### `/`

アプリの概要を表示する。

役割:

- アプリ名の表示
- 簡単な説明
- `/labo` へのリンク

### `/labo`

labo機能を表示する。

役割:

- 人生カウンターコンポーネントの表示
- 日付差分計算コンポーネントの表示
- 日付計算ページへのリンク
- カウントダウンページへのリンク

## コンポーネント設計

### `Header.tsx`

全体共通のヘッダー。

役割:

- トップページへのリンク
- laboページへのリンク

### `BirthdayCalculator.tsx`

人生カウンター用コンポーネント。

役割:

- 生年月日の入力
- 計算ボタン
- 計算結果の表示

計算ロジック自体は `features/labo/utils/date.ts` に置く。

### `DateDiffCalculator.tsx`

日付差分計算用コンポーネント。

役割:

- 開始日の入力
- 終了日の入力
- 計算ボタン
- 差分日数の表示

計算ロジック自体は `features/labo/utils/date.ts` に置く。

### `DateAdditionCalculator.tsx`

日付計算用コンポーネント。

役割:

- 基準日の入力
- 加算する日数の入力
- 結果日付の表示

計算ロジック自体は feature 配下の utils に置く。

### `CountdownCalculator.tsx`

カウントダウン用コンポーネント。

役割:

- 目標日の入力
- 今日から目標日までの日数表示
- 過去日を指定した場合の経過日数表示

計算ロジック自体は feature 配下の utils に置く。

## ロジック設計

### `features/labo/utils/date.ts`

日付計算用の純粋関数を置く。

想定する関数:

```ts
calculateAge(birthDate: string): number
calculateDaysUntilNextBirthday(birthDate: string): number
calculateDateDiff(startDate: string, endDate: string): number
```

Reactに依存しない形にする。

## 設計方針

- `app/` はルーティングとページ構成に集中させる
- `features/labo/` にlabo機能の実装をまとめる
- 計算ロジックはコンポーネントから分離する
- 最初から汎用コンポーネントを増やしすぎない
- 2〜3回重複してから共通化を検討する
