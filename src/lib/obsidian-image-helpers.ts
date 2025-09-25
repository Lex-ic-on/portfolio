import { existsSync, mkdirSync } from 'node:fs';
import path from 'node:path';

const DEFAULT_COLLECTION = 'blog';
const SUPPORTED_IMAGE_EXTENSIONS = new Set(['png', 'jpg', 'jpeg', 'webp', 'gif', 'avif']);

export interface ResolveObsidianImageOptions {
  slug: string;
  collection?: string;
  publicDir?: string;
}

export interface ResolvedObsidianImage {
  url: string;
  alt: string;
  fileName: string;
  absoluteDir: string;
}

/**
 * Parse a raw Obsidian embed value (e.g. `image.png` or `image.png|Alt`).
 */
export function parseObsidianImageValue(value: string): {
  fileName: string;
  altText?: string;
} | null {
  if (!value) {
    return null;
  }

  const [fileNameRaw, altRaw] = value.split('|');
  const fileName = fileNameRaw?.trim();
  const altText = altRaw?.trim();

  if (!fileName) {
    return null;
  }

  return { fileName, altText: altText || undefined };
}

function isSupportedImage(fileName: string): boolean {
  const extension = path.extname(fileName).slice(1).toLowerCase();
  return extension.length > 0 && SUPPORTED_IMAGE_EXTENSIONS.has(extension);
}

function ensureDirectoryExists(directoryPath: string) {
  if (!existsSync(directoryPath)) {
    mkdirSync(directoryPath, { recursive: true });
  }
}

function buildUrlPath(parts: string[]): string {
  return `/${parts
    .filter(Boolean)
    .map(segment => segment.split('/').map(encodeURIComponent).join('/'))
    .join('/')}`;
}

function getDefaultPublicDir(): string {
  return path.join(process.cwd(), 'public');
}

export function resolveObsidianImageEmbed(
  rawValue: string,
  { slug, collection = DEFAULT_COLLECTION, publicDir = getDefaultPublicDir() }: ResolveObsidianImageOptions,
): ResolvedObsidianImage | null {
  const parsed = parseObsidianImageValue(rawValue);
  if (!parsed) {
    return null;
  }

  if (!isSupportedImage(parsed.fileName)) {
    return null;
  }

  const relativeDir = path.join('images', collection, slug);
  const absoluteDir = path.join(publicDir, relativeDir);
  ensureDirectoryExists(absoluteDir);

  const url = buildUrlPath(['images', collection, slug, parsed.fileName]);
  const alt = parsed.altText || path.parse(parsed.fileName).name;

  return {
    url,
    alt,
    fileName: parsed.fileName,
    absoluteDir,
  };
}

export { SUPPORTED_IMAGE_EXTENSIONS };
