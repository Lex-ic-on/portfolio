import { access } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

export const DEFAULT_OG_IMAGE_PATH = '/thumbnails/default.png';

const PUBLIC_DIR_PATH = fileURLToPath(new URL('../../public/', import.meta.url));

const ABSOLUTE_URL_PATTERN = /^https?:\/\//i;

function isAbsoluteUrl(candidate: string): boolean {
  return ABSOLUTE_URL_PATTERN.test(candidate.trim());
}

function normalizePublicPath(candidate: string): string {
  const trimmed = candidate.trim();
  if (!trimmed) {
    return DEFAULT_OG_IMAGE_PATH;
  }
  return trimmed.startsWith('/') ? trimmed : `/${trimmed}`;
}

function toPublicFilesystemPath(webPath: string): string {
  const relative = webPath.replace(/^\/+/, '');
  return path.join(PUBLIC_DIR_PATH, relative);
}

async function fileExists(fsPath: string): Promise<boolean> {
  try {
    await access(fsPath);
    return true;
  } catch {
    return false;
  }
}

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

export function guessOgImageMimeType(imagePath: string): string {
  if (!imagePath) {
    return 'image/png';
  }
  const extension = path.extname(imagePath).toLowerCase();
  return MIME_TYPES[extension] ?? 'image/png';
}
