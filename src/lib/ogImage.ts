import { access } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

// OGPに使うデフォルト画像のパス
export const DEFAULT_OG_IMAGE_PATH = '/thumbnails/default.png';

// publicディレクトリの絶対パスを算出
const PUBLIC_DIR_PATH = fileURLToPath(new URL('../../public/', import.meta.url));

// 絶対URLを判定するための正規表現
const ABSOLUTE_URL_PATTERN = /^https?:\/\//i;

// 文字列が絶対URLかどうかを判定
function isAbsoluteUrl(candidate: string): boolean {
  return ABSOLUTE_URL_PATTERN.test(candidate.trim());
}

// public配下で利用できる形式にパスを整形
function normalizePublicPath(candidate: string): string {
  const trimmed = candidate.trim();
  if (!trimmed) {
    return DEFAULT_OG_IMAGE_PATH;
  }
  return trimmed.startsWith('/') ? trimmed : `/${trimmed}`;
}

// Webパスからローカルファイルシステムのパスに変換
function toPublicFilesystemPath(webPath: string): string {
  const relative = webPath.replace(/^\/+/, '');
  return path.join(PUBLIC_DIR_PATH, relative);
}

// 指定したパスにファイルが存在するか非同期で確認
async function fileExists(fsPath: string): Promise<boolean> {
  try {
    await access(fsPath);
    return true;
  } catch {
    return false;
  }
}

// 候補リストから最初に存在するOG画像を決定
export async function pickOgImage(candidatePaths: Array<string | undefined | null>, fallbackPath: string = DEFAULT_OG_IMAGE_PATH): Promise<string> {
  for (const candidate of candidatePaths) {
    if (!candidate) {
      continue;
    }

    const trimmed = candidate.trim();
    if (!trimmed) {
      continue;
    }

    if (isAbsoluteUrl(trimmed)) {
      return trimmed;
    }

    const normalized = normalizePublicPath(trimmed);
    const fsPath = toPublicFilesystemPath(normalized);

    if (await fileExists(fsPath)) {
      return normalized;
    }
  }

  if (isAbsoluteUrl(fallbackPath)) {
    return fallbackPath;
  }

  return normalizePublicPath(fallbackPath);
}

// サイト情報とページURLから最終的なOG画像のURLを組み立て
export function buildOgImageUrl({
  imagePath,
  site,
  pageUrl,
}: {
  imagePath: string;
  site?: string | URL | null;
  pageUrl?: URL | null;
}): string {
  const trimmed = imagePath.trim();
  if (!trimmed) {
    return '';
  }

  if (isAbsoluteUrl(trimmed)) {
    return trimmed;
  }

  const normalized = normalizePublicPath(trimmed);
  const base = site
    ? typeof site === 'string'
      ? site
      : site.href
    : pageUrl?.origin;

  if (base) {
    return new URL(normalized, base).toString();
  }

  return normalized;
}

const MIME_TYPES: Record<string, string> = {
  '.apng': 'image/apng',
  '.avif': 'image/avif',
  '.gif': 'image/gif',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.png': 'image/png',
  '.svg': 'image/svg+xml',
  '.webp': 'image/webp',
};

// 拡張子から適切なOG画像のMIMEタイプを推測
export function guessOgImageMimeType(imagePath: string): string {
  if (!imagePath) {
    return 'image/png';
  }
  const extension = path.extname(imagePath).toLowerCase();
  return MIME_TYPES[extension] ?? 'image/png';
}
