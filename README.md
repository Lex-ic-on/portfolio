renewal

---

## Getting Started

First, run the development server:

```bash
npm run dev
```

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
