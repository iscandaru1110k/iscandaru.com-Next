import type { Media } from "@/features/projects/components/MediaSlot";

// TikTok LIVE Case Study の公開用コンテンツ。
// 一次情報は tiktok-live-sort-game リポジトリ。更新時は手動で確認して反映する（docs/decisions.md Decision E）。
// userId / nickname / ログ / 内部接続情報などは載せない（docs/requirements.md「掲載しない情報」）。

export const HERO_MEDIA: Media = {
  label: "Gatling Defense プレイ映像",
};

export const WHAT_I_BUILT = [
  {
    title: "配信者のPCで動くWebアプリ",
    body: "一般公開のブラウザゲームではなく、配信者が自分のPCで起動して使うアプリです。",
  },
  {
    title: "配信画面にそのまま載せる",
    body: "操作用の画面とは別に、配信用の画面を OBS や TikTok LIVE Studio に取り込んで映します。",
  },
  {
    title: "視聴者のアクションで展開が変わる",
    body: "LIKE・ギフト・コメント・フォローがリアルタイムにゲームへ届き、配信中の展開を変えます。",
  },
  {
    title: "縦型 9:16 のLIVE向け設計",
    body: "スマホで見る TikTok LIVE に合わせて、縦長の画面で見やすいレイアウトにしています。",
  },
];

export const STORY_STEPS = [
  {
    label: "01",
    title: "ソートアルゴリズムの可視化",
    body: "棒グラフが並び替わる様子と音を楽しむ、ソート可視化アプリとしてスタート。",
  },
  {
    label: "02",
    title: "Sort Battle へ",
    body: "2つのアルゴリズムを競わせる対戦モードを追加し、コメントで視聴者が応援できるように。",
  },
  {
    label: "03",
    title: "視聴者参加を主役に",
    body: "ギフトやLIKEで展開が変わる仕組みを広げ、「見る」から「参加する」配信へ。",
  },
  {
    label: "04",
    title: "独立したゲームへ拡張",
    body: "ソートを使わない Skill Check・Runner・Gatling Defense など、LIVE向けの独立ゲームへ発展。",
  },
];

export type FeaturedMode = {
  id: string;
  name: string;
  nameJa: string;
  tagline: string;
  description: string;
  interactions: string[];
  media: Media;
};

export const FEATURED_MODES: FeaturedMode[] = [
  {
    id: "gatling-defense",
    name: "Gatling Defense",
    nameJa: "ガトリングモード",
    tagline: "視聴者 vs 配信者の防衛戦",
    description:
      "塔に迫る敵を、配信者がキーボードを連打して左右の砲台で撃ち落とす防衛ゲーム。視聴者は敵を送り込む側にも、配信者を助ける側にも回れます。",
    interactions: [
      "LIKE が集まるほど敵の出現ペースが上がる",
      "ギフトで敵の増援・ボス出現、または塔の回復や強力な砲撃",
      "最後は GIFTER RANKING でリザルト表示",
    ],
    media: { label: "Gatling Defense プレイ映像" },
  },
  {
    id: "dino-runner",
    name: "Dino Runner",
    nameJa: "ランナーモード",
    tagline: "初見でも分かるジャンプアクション",
    description:
      "障害物をジャンプとしゃがみで避けながら走り続けるランナーゲーム。ルールが直感的なので、途中から配信を見た人でもすぐに状況が分かります。",
    interactions: [
      "ギフトで妨害（ハザード・霧・雷など）や支援（HP回復・飛行）",
      "飛行中は障害物をすり抜けて一気に進める",
      "LIKE が一定数集まるたびにランダムな妨害イベント",
    ],
    media: { label: "Dino Runner プレイ映像" },
  },
  {
    id: "sort-battle",
    name: "Sort Battle",
    nameJa: "ソートバトルモード",
    tagline: "すべての原点、アルゴリズム対決",
    description:
      "同じ配列を2つのソートアルゴリズムが同時に並び替え、どちらが先に終わるかを競うモード。ソート可視化から現在のゲーム群へ発展した、プロジェクトの原点です。",
    interactions: [
      "コメント投票で ALPHA / OMEGA どちらかをブースト",
      "ギフトで相手チームを一時停止、または味方を超加速",
      "フォローで両チームがスピードアップ",
    ],
    media: { label: "Sort Battle プレイ映像" },
  },
];

export const OTHER_MODES = [
  {
    name: "Sort",
    nameJa: "ソートモード",
    body: "15種類以上のソートアルゴリズムを、音と棒グラフで見て楽しむ可視化モード。",
  },
  {
    name: "Quest / Battle Run",
    nameJa: "クエストモード",
    body: "5つのステージを制限時間内に協力してクリアするモード。ギフトでアルゴリズムを強化できます。",
  },
  {
    name: "Pure Skill Check",
    nameJa: "スキルチェックモード",
    body: "タイミングよく判定ゾーンを狙うスキルチェック。視聴者はギフトやコメントで妨害・応援できます。",
  },
];

export const LIVE_INTERACTIONS = [
  {
    action: "LIKE",
    viewer: "画面をタップして LIKE を送る",
    result: "LIKE が一定数たまるとイベントが発生。Gatling Defense では敵の勢いが増します。",
  },
  {
    action: "Gift",
    viewer: "ギフトを贈る",
    result: "ゲームごとに妨害や支援の効果が発動。贈った順に1つずつ反映されます。",
  },
  {
    action: "Comment",
    viewer: "決められたワードをコメントする",
    result: "投票やチャンスタイムに参加。Sort Battle ではチームの応援になります。",
  },
  {
    action: "Follow",
    viewer: "配信者をフォローする",
    result: "スピードアップや支援など、モードごとのボーナスが発生します。",
  },
];

export const TECHNICAL_CHALLENGES = [
  {
    title: "操作画面と配信画面の分離",
    problem: "配信用の画面でもゲームが動くと、状態や音がズレたり二重に鳴ったりする。",
    solution:
      "ゲームを動かすのは操作用の Operator 画面だけにし、配信用の Presentation 画面は受け取った状態を描くだけの読み取り専用にしました。",
  },
  {
    title: "WebSocket による画面同期",
    problem: "配信ソフト側の通信が詰まると、映像が遅れて溜まっていく。",
    solution:
      "描画フレームと状態を分けて送り、通信が詰まったときは差し替え可能な描画フレームだけを間引くことで、重要な状態を失わないようにしました。",
  },
  {
    title: "ギフトの公平な反映",
    problem: "ギフトが連続すると、後から来た効果に埋もれて「自分のギフトが反映されない」ことがある。",
    solution:
      "ギフトは届いた順に1つずつ必ず反映する FIFO キューで処理し、LIKE 由来のイベントはギフトを追い越さない低優先の枠に分けました。",
  },
  {
    title: "実LIVE特有のデータ揺れ",
    problem: "LIKE の累計値が 505 → 499 → 518 のように巻き戻ることがあり、同じ達成演出が二重に発生しうる。",
    solution:
      "これまでの最大値を基準に判定し、配信（ルーム）単位で集計を区切ることで、巻き戻りや再起動があっても演出が重複しないようにしました。",
  },
  {
    title: "再現できるゲームロジック",
    problem: "LIVE中に起きた不具合は、同じ状況をもう一度作るのが難しい。",
    solution:
      "ゲームの中核を固定タイムステップと乱数状態を持つ純粋なロジックとして作り、シナリオファイルで LIVE イベントを再生して検証できるようにしました。",
  },
  {
    title: "LIVEログからの改善",
    problem: "テストだけでは、実際の配信でどこが盛り上がり、どこで止まったか分からない。",
    solution:
      "配信ごとのログを集計して時系列で分析し、個人情報を除いた分析結果を次の仕様や判断へつなげています。",
  },
];

export const ARCHITECTURE_FLOW = [
  { name: "TikTok LIVE", note: "LIKE / Gift / Comment / Follow" },
  { name: "Node LIVE Event Server", note: "イベント受信・変換" },
  { name: "Operator", note: "ゲームロジック・音・入力" },
  { name: "WebSocket", note: "状態と描画フレームを配信" },
  { name: "Presentation", note: "読み取り専用の配信用画面" },
  { name: "OBS / LIVE Studio", note: "配信画面に合成" },
];

export const TECH_STACK = [
  "TypeScript",
  "React",
  "Vite",
  "Node.js",
  "WebSocket (ws)",
  "Canvas API",
  "Web Audio API",
  "tiktok-live-connector",
  "Vitest",
  "Testing Library",
  "ESLint",
  "Prettier",
  "GitHub Actions",
];

export const DEVELOPMENT_METRICS_AS_OF = "2026-09-25時点";

export const DEVELOPMENT_METRICS = [
  { value: "295", label: "Merged PRs" },
  { value: "321", label: "Decisions" },
  { value: "260", label: "Test files" },
  { value: "約4,800", label: "Test cases" },
];

export const DEVELOPMENT_PROCESS = [
  "2026年8月の初回コミットから、約2か月で6モードまで拡張",
  "機能ごとに SPEC（目標仕様）と BACKLOG（現状との差分）を分けて管理",
  "判断の理由と採用しなかった案を Decision として記録",
  "AI エージェントが必要な知識だけを読めるよう、ドキュメントを階層化",
  "実LIVEのログ分析と、シナリオ再生による再現テストで検証",
];

export const GALLERY_ITEMS: Media[] = [
  { label: "Gatling Defense" },
  { label: "Dino Runner" },
  { label: "Sort Battle" },
  { label: "Quest" },
  { label: "Pure Skill Check" },
  { label: "Operator 画面" },
];
