# Labo App Rebuild

個人開発アプリのリビルドプロジェクトです。

旧アプリは Flask + HTML/CSS/JS で構築していましたが、今回は Next.js App Router + TypeScript を使って、シンプルで保守しやすい構成に作り直します。

## 目的

- Next.js App Router + TypeScript で再構築する
- シンプルで保守しやすい構成にする
- 設計力を身につける
- 小さく作って動かしながら改善する

## スコープ

初期スコープでは `labo` 機能のみを実装します。

- 誕生日計算
- 日付差分計算

## やらないこと

初期段階では以下は扱いません。

- DB
- 認証
- 複雑な状態管理
- API化
- Docker

## ディレクトリ構成

```txt
.
├── app/   # Next.js アプリ本体
├── docs/  # 要件・設計・意思決定メモ
└── README.md