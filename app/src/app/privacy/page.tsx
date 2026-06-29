import styles from "./PrivacyPage.module.css";

const policySections = [
  {
    title: "1. 個人情報の利用目的",
    paragraphs: [
      "当サイトでは、お問い合わせの際に、名前、メールアドレス、お問い合わせ内容などの個人情報を入力いただく場合があります。",
      "取得した個人情報は、お問い合わせへの回答や必要な連絡のために利用し、それ以外の目的では利用しません。",
    ],
  },
  {
    title: "2. アクセス解析について",
    paragraphs: [
      "当サイトでは、サイトの利用状況を把握し、内容や使いやすさを改善する目的で、アクセス解析を行う場合があります。",
      "アクセス解析ではCookie等を利用することがありますが、個人を特定する目的では使用しません。",
    ],
  },
  {
    title: "3. Cookieについて",
    paragraphs: [
      "Cookieは、ブラウザに保存される小さな情報で、サイトの閲覧状況の把握や利便性向上のために利用されることがあります。",
      "Cookieの利用を望まない場合は、ブラウザの設定により無効にすることができます。",
    ],
  },
  {
    title: "4. 個人情報の第三者提供",
    paragraphs: [
      "当サイトでは、本人の同意がある場合または法令に基づく場合を除き、取得した個人情報を第三者に提供しません。",
    ],
  },
  {
    title: "5. 免責事項",
    paragraphs: [
      "当サイトから外部サイトへリンクする場合があります。リンク先の内容やサービスについては、当サイトでは責任を負いません。",
      "当サイトに掲載する情報は、できる限り正確な内容となるよう努めますが、内容の正確性や安全性を保証するものではありません。",
    ],
  },
  {
    title: "6. 著作権",
    paragraphs: [
      "当サイトに掲載している文章、画像、その他コンテンツの著作権は、特別な記載がない限り当サイト運営者に帰属します。",
      "無断転載、複製、改変、再配布を禁止します。",
    ],
  },
  {
    title: "7. プライバシーポリシーの変更",
    paragraphs: [
      "本ポリシーの内容は、必要に応じて変更することがあります。",
      "変更後の最新内容は、本ページに掲載された時点で有効になるものとします。",
    ],
  },
];

export default function PrivacyPage() {
  return (
    <main className={styles.page}>
      <section className={styles.hero}>
        <p className={styles.eyebrow}>POLICY</p>
        <h1 className={styles.title}>Privacy Policy</h1>
        <p className={styles.lead}>
          当サイトにおける個人情報の取り扱いについて、以下の通り定めます。
        </p>
      </section>

      <div className={styles.sections}>
        {policySections.map((section) => (
          <section key={section.title} className={styles.section}>
            <h2 className={styles.sectionTitle}>{section.title}</h2>
            {section.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </section>
        ))}
      </div>
    </main>
  );
}

