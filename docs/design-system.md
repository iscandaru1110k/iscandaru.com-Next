# Design System

このサイトのデザインは、強い装飾よりも「読みやすさ」「相談しやすさ」「信頼感」を優先する。
新しいページや機能を追加するときは、ここに記載したルールを基準にして、CSS Modules 内で必要なスタイルを組み立てる。

## Color

色は `app/src/app/globals.css` の `--color-*` を使う。

- `--color-background`: 基本の白背景。本文やカードのベースに使う。
- `--color-foreground`: 本文や主見出しの文字色。黒ではなく少し青みを含め、硬さを抑える。
- `--color-surface-muted`: 薄いブルー系背景。セクション内の補助領域やタグに使う。
- `--color-primary`: ブランド感を出す濃い青。リンク、見出し、主要CTAに限定して使う。
- `--color-primary-soft`: Heroや結果枠の上辺アクセントに使う。太い枠線の代わりに軽い強調を作る。
- `--color-muted`: 補足文や説明文に使う。
- `--color-border-muted`: カードやセクションを分ける薄い線に使う。

色の役割を分けることで、青い枠線に頼らず、余白・薄い線・背景で情報を整理する。

## Typography

フォントは `layout.tsx` で読み込む Geist をベースにする。
本文は読みやすさを優先し、行間はおおむね `1.7` から `1.9` を使う。

- ページ見出し: `1.875rem` 前後
- カード見出し: `1.125rem` 前後
- 本文: `1rem` 前後
- 補足: `0.8125rem` から `0.9375rem`

トップのHeroなど、第一印象を作る箇所のみ `clamp()` で大きめの見出しを使う。

## Container Width

コンテナ幅は以下の変数を使う。

- `--container-sm`: フォームや単機能ページ向け
- `--container-md`: LABO一覧やPrivacy向け
- `--container-lg`: トップ、Profile向け
- `--container-page-inline`: 画面端の余白を保つための幅

ページ幅は原則 `width: min(var(--container-page-inline), var(--container-*));` とする。
コンテンツ幅を広げすぎず、読みやすい行長を保つ。

## Spacing

余白は `--space-*` を使い、4px / 8px グリッドに揃える。

- `--space-xs`: 小さな部品内の余白
- `--space-sm`: タグ、ボタン内、近い要素間
- `--space-md`: 標準の近接余白
- `--space-lg`: カード内や見出し下
- `--space-xl` 以上: セクション間、Hero内余白

スクロール時に一定のリズムで情報が現れるよう、ページ上部やセクション間は広めに取る。

## Border Radius

角丸は `--radius-*` を使う。

- `--radius-control`: input などの小さな操作要素
- `--radius-md`: カード、結果枠、通常セクション
- `--radius-xl`: Heroや404パネルなど大きめの枠
- `--radius-pill`: CTA、タグ、ナビリンク

角丸は柔らかさを出すために維持するが、過度に丸くしない。

## Border

通常の区切りは `--border-subtle` を使う。
入力欄は `--border-input` を使う。

Heroや結果枠の強調は、太い全周ボーダーではなく `--border-accent-top` / `--border-result-top` の上辺アクセントを使う。
これにより、落ち着いた印象を保ちながら視線の起点を作る。

## Shadow

影は控えめに使う。

- `--shadow-card`: 通常カード
- `--shadow-hero`: Heroや404の大きなパネル
- `--shadow-result`: 計算結果などの小さな強調
- `--shadow-focus`: フォーカスリング

影は情報の階層を示すための補助であり、装飾として強くしすぎない。
現状はサイズ名ではなく用途名で管理する。既存UIとの対応が分かりやすく、ページ追加時に選ぶべき影を判断しやすいため。

## Button

主要CTAは濃い青背景、白文字、pill型を基本とする。
padding は `--padding-button` を使う。

外部リンクでもボタン表現を使う場合は、`target="_blank"` と `rel="noopener noreferrer"` を付ける。

## Card

カードは以下を基本とする。

- `border: var(--border-subtle)`
- `border-radius: var(--radius-md)`
- `background: var(--color-background)`
- `box-shadow: var(--shadow-card)`
- padding は `--space-lg` から `--space-card`

カードは情報のまとまりを示すための器として使い、ページセクション全体を重く囲いすぎない。

## Section

セクション間は広めに取り、背景と余白で情報を分ける。
Profileのように複数セクションが続くページでは `--space-6xl` 程度の間隔を基準にする。

## Tag

タグは pill型で、`--padding-tag` と `--color-surface-muted` を基本にする。
スキルやサービスのように、短いキーワードを軽く見せたいときに使う。

## Header

Headerはサイトに入った瞬間の印象を作る領域として扱う。
旧サイト由来のロゴや背景画像の記憶を残しつつ、主要導線だけを静かに見せることで、個人サイトらしさと迷いにくさを両立する。
ページが増えてもHeaderを情報過多にせず、必要に応じてFooterやページ内導線へ役割を分ける。

## Footer

Footerはページを読み終えたあとに、次の行動を静かに提示する領域として扱う。
本文より一段控えめな背景と薄い線で区切り、PrivacyやContactなど、安心して利用するための補助導線をまとめる。

## Animation

現状では大きなアニメーションは使わない。
相談しやすさと落ち着きを優先し、動きで注意を奪わないため。

追加する場合は、hover / focus の小さな状態変化に留める。
ページ遷移、Hero、カード表示などに強い演出を入れる場合は、読みやすさやアクセシビリティへの影響を先に確認する。

## Accessibility

リンクやボタンは、キーボード操作でも分かるよう `:focus-visible` を用意する。
外部リンクは `target="_blank"` と `rel="noopener noreferrer"` をセットで付与する。

色だけで意味を伝えず、見出し、本文、余白、ラベルで情報の関係が分かるようにする。
フォームや入力欄を追加する場合は、ラベルとエラーメッセージを明確にし、見た目よりも理解しやすさを優先する。

## Responsive

現状はCSS Modules内のメディアクエリで対応する。

- 大きなカードグリッドはタブレットで2列、スマホで1列にする。
- ページ幅は `min()` で制限し、左右に余白を残す。
- モバイルではHeroやカードのpaddingを少し抑える。

## New Component Rules

- 既存コンポーネントを優先して再利用する。
- 色は直接指定せず、`--color-*` を使う。
- 余白は `--space-*` を優先する。
- カードやHeroは既存の border / shadow / radius トークンを使う。
- 新しい共通コンポーネントは、同じ見た目が2〜3回以上出てから検討する。
- 文脈固有のCSSは各 `*.module.css` に閉じる。
- Tailwind CSS / SCSS / UIライブラリは導入しない。
