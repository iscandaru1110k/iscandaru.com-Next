import type { Media } from "@/features/projects/components/MediaSlot";

// TikTok LIVE Case Study の公開用コンテンツ。
// 一次情報は tiktok-live-sort-game リポジトリ。更新時は手動で確認して反映する（docs/decisions.md Decision E）。
// userId / nickname / ログ / 内部接続情報などは載せない（docs/requirements.md「掲載しない情報」）。

// 動画は app/public/videos/ に置いた Web 用圧縮版。width / height は実寸（比率の維持に使う）
const GATLING_DEFENSE_VIDEO: Media = {
  label: "Gatling Defense プレイ映像",
  src: "/videos/gatling-defense.mp4",
  width: 852,
  height: 710,
};

export const HERO_MEDIA: Media = GATLING_DEFENSE_VIDEO;

export const WHAT_I_BUILT = [
  "TikTok LIVE の配信中に使う、視聴者参加型のWebアプリです。ゲームは配信者のPCで動かし、配信用の画面を OBS や TikTok LIVE Studio に取り込んで映します。",
  "視聴者が送った LIKE・ギフト・コメント・フォローは、その場でゲームに反映されます。スマホで見る TikTok LIVE に合わせて、画面はすべて縦型で設計しています。",
];

export const STORY_STEPS = [
  {
    label: "01",
    title: "ソートアルゴリズムの可視化",
    body: "棒グラフが並び替わる様子と音を楽しむ、可視化アプリとしてスタート。",
  },
  {
    label: "02",
    title: "Sort Battle へ",
    body: "2つのアルゴリズムを競わせ、コメントで応援できる対戦モードに。",
  },
  {
    label: "03",
    title: "視聴者参加を主役に",
    body: "ギフトやLIKEで展開が変わる仕組みを広げ、「見る」から「参加する」配信へ。",
  },
  {
    label: "04",
    title: "独立したゲームへ拡張",
    body: "ソートを使わない Runner や Gatling Defense など、LIVE向けのゲームへ。",
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
    media: GATLING_DEFENSE_VIDEO,
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
    media: {
      label: "Dino Runner プレイ映像",
      src: "/videos/dino-runner.mp4",
      width: 852,
      height: 512,
    },
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
    media: {
      label: "Sort Battle プレイ映像",
      src: "/videos/sort-battle.mp4",
      width: 408,
      height: 852,
    },
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
    title: "LIVEイベントを公平に処理する",
    problem:
      "ギフトが立て続けに届くと、後から来た効果に埋もれて「自分のギフトが反映されなかった」と感じさせてしまう。参加した手応えがなければ、視聴者参加型は成り立たない。",
    solution:
      "ギフトは届いた順に1つずつ必ず反映し、LIKE から生まれるイベントはギフトを追い越さない低い優先度で待たせる設計にしました。誰の、どのアクションで何が起きたかが画面上で分かるようにしています。",
  },
  {
    title: "実LIVEを改善につなげるログ基盤",
    problem:
      "LIKE の累計が一瞬だけ巻き戻るなど、実際の配信ではローカルのテストでは起きない問題が起きる。どこで盛り上がり、どこで止まったかも、配信を終えると分からなくなる。",
    solution:
      "配信ごとにイベントを記録して集計・時系列分析し、見つけた問題はシナリオとして再生して再現・修正します。個人情報を取り除いた分析結果だけを、次の仕様や改善へ戻しています。",
  },
  {
    title: "3秒でわかるゲーム画面",
    problem:
      "TikTok LIVE の視聴者は途中から入ってきて、スマホの小さな画面で見る。ルール説明を読んでもらう前提にはできない。",
    solution:
      "縦型 9:16 でゲーム領域を大きく取り、HP やいいねゲージ、ギフトで何が起きるかを示す Gift Guide、リザルトなどの情報に優先順位をつけて配置しています。撃つ・跳ぶのように、見た瞬間にルールを想像できるゲームを選んでいます。",
  },
];

export const ARCHITECTURE_FLOW = [
  { name: "TikTok LIVE", note: "視聴者の LIKE / Gift / Comment / Follow" },
  { name: "Node LIVE Event Server", note: "イベントを受け取り、ゲーム用に変換" },
  { name: "Operator", note: "配信者の操作画面。ゲームを動かす" },
  { name: "WebSocket", note: "ゲームの状態を配信用画面へ送る" },
  { name: "Presentation", note: "視聴者に見せる配信用画面" },
  { name: "OBS / TikTok LIVE Studio", note: "配信画面に合成して LIVE へ" },
];

export const TOOL_GROUPS = [
  {
    title: "Tech Stack",
    items: [
      "TypeScript",
      "React",
      "Vite",
      "Node.js",
      "WebSocket",
      "Canvas API",
      "Web Audio API",
      "Vitest",
    ],
  },
  {
    title: "Streaming / Platform",
    items: ["TikTok LIVE", "OBS", "TikTok LIVE Studio"],
  },
  {
    title: "Development Tools / AI",
    items: ["GitHub", "ChatGPT", "Claude Code"],
  },
];

export const DEVELOPMENT_METRICS_AS_OF = "2026年9月時点";

export const DEVELOPMENT_PROCESS = [
  {
    value: "300+",
    label: "Updates",
    title: "300回以上のアップデート",
    body: "初回コミット以降、実際の配信で気づいたことを小さな改善として積み重ね、300回以上のアップデートを重ねてきました。",
  },
  {
    value: "6 Modes",
    label: "in 2 months",
    title: "約2か月で6モード",
    body: "2026年8月の初回コミットから約2か月で、ソート可視化から6つのゲームモードまで拡張しました。",
  },
  {
    value: "AI",
    label: "Harness",
    title: "AIを組み込んだ開発プロセス",
    body: "仕様・バックログ・設計判断をドキュメントとして整理し、AIエージェントが必要な情報を読みながら設計・実装・検証を回せる開発基盤を整えています。個人開発でも、大きなプロダクトを継続して育てられるようにしています。",
  },
];
