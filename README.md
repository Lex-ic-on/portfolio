renewal

---

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

## ExcerptHelper の利用について

Astro 版のブログ一覧などで本文から自動的に抜粋を生成したい場合は、`src/components/ExcerptHelper.ts` に実装したユーティリティを利用します。

- `toPlainText(markdown: string)` — Markdown テキストから装飾を取り除いたプレーンテキストを返します（コードブロックやリンク記法などを削除）。
- `createExcerpt(markdown: string, length?: number, suffix?: string)` — プレーンテキスト化した本文から指定文字数で抜粋を作成します。160 文字を超える場合は既定で `……` を付与します。
- `getDescription({ description, body, length, suffix })` — フロントマターの `description` を優先し、空の場合は本文から抜粋を生成します。ブログ一覧ではこれを呼び出しています。

### 呼び出し例（Astro コンポーネント）

```ts
import { getDescription } from '../components/ExcerptHelper';

const summary = getDescription({
  description: entry.data.description,
  body: entry.body,
  length: 160,
  suffix: '……',
});
```

今後 CMS が増えた場合も同ヘルパーをインポートするだけで共通の抜粋生成ロジックを再利用できます。
