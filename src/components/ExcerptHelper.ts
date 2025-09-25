export const EXCERPT_LENGTH = 160;
export const EXCERPT_SUFFIX = '……';

export const toPlainText = (markdown: string) => markdown
  .replace(/```[\s\S]*?```/g, ' ') // コードブロック全体を空白に置換して除去
  .replace(/`([^`]+)`/g, '$1') // インラインコードを囲むバッククォートを削除
  .replace(/!\[([^\]]*)\]\([^\)]+\)/g, '$1') // 画像の構文を代替テキストに置換
  .replace(/\[([^\]]+)\]\([^\)]+\)/g, '$1') // リンクの構文をリンクテキストに置換
  .replace(/\[([^\]]+)\]\[[^\]]*\]/g, '$1') // 参照リンク構文をリンクテキストに置換
  .replace(/^>\s?/gm, '') // 引用の先頭記号を除去
  .replace(/^#{1,6}\s+/gm, '') // 見出しのハッシュ記号を除去
  .replace(/^\s*[-*+]\s+/gm, '') // リストの行頭記号を除去
  .replace(/\r?\n/g, ' ') // 改行をスペースに変換
  .replace(/\s+/g, ' ') // 連続する空白を単一スペースに縮約
  .trim();

export const createExcerpt = (
  markdown: string,
  length = EXCERPT_LENGTH,
  suffix = EXCERPT_SUFFIX,
) => {
  const plainText = toPlainText(markdown);
  if (!plainText) {
    return '';
  }

  const characters = Array.from(plainText);
  if (characters.length <= length) {
    return plainText;
  }

  return `${characters.slice(0, length).join('')}${suffix}`;
};

export const getDescription = ({
  description,
  body,
  length = EXCERPT_LENGTH,
  suffix = EXCERPT_SUFFIX,
}: {
  description?: string;
  body: string;
  length?: number;
  suffix?: string;
}) => {
  const trimmedDescription = description?.trim();
  if (trimmedDescription) {
    return trimmedDescription;
  }

  return createExcerpt(body, length, suffix);
};
