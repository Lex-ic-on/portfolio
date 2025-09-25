import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createRequire } from 'node:module';
import ts from 'typescript';

function loadOgImageModule() {
  const require = createRequire(import.meta.url);
  const sourceUrl = new URL('../src/lib/ogImage.ts', import.meta.url);
  const filename = fileURLToPath(sourceUrl);
  const source = readFileSync(filename, 'utf8');

  const transpiled = ts.transpileModule(source, {
    compilerOptions: {
      module: ts.ModuleKind.CommonJS,
      target: ts.ScriptTarget.ES2022,
      moduleResolution: ts.ModuleResolutionKind.NodeNext,
      esModuleInterop: true,
    },
    fileName: filename,
  }).outputText;

  const moduleUrl = new URL('../src/lib/ogImage.ts', import.meta.url).href;
  const patched = transpiled.replace(/import\.meta\.url/g, JSON.stringify(moduleUrl));

  const module = { exports: {} };
  const exports = module.exports;

  const compiled = new Function('exports', 'require', 'module', '__filename', '__dirname', patched);
  compiled(exports, require, module, filename.replace(/\.ts$/, '.js'), path.dirname(filename));

  return module.exports;
}

const {
  pickOgImage,
  buildOgImageUrl,
  guessOgImageMimeType,
  DEFAULT_OG_IMAGE_PATH,
} = loadOgImageModule();

test('pickOgImage resolves first existing candidate', async () => {
  const result = await pickOgImage([
    '/thumbnails/blog/tkx-2025/thumbnail.webp',
    '/thumbnails/blog/tkx2025/thumbnail.webp',
    '/thumbnails/blog/TKX2025/thumbnail.webp',
  ]);

  assert.equal(result.toLowerCase(), '/thumbnails/blog/tkx2025/thumbnail.webp');
});

test('pickOgImage falls back to default when nothing exists', async () => {
  const result = await pickOgImage(['/thumbnails/blog/does-not-exist/thumbnail.webp']);
  assert.equal(result, DEFAULT_OG_IMAGE_PATH);
});

test('buildOgImageUrl returns absolute URL when site is provided', () => {
  const url = buildOgImageUrl({
    imagePath: '/thumbnails/blog/TKX2025/thumbnail.webp',
    site: 'https://1ex.me',
  });

  assert.equal(url, 'https://1ex.me/thumbnails/blog/TKX2025/thumbnail.webp');
});

test('guessOgImageMimeType returns extension-aware type', () => {
  assert.equal(guessOgImageMimeType('/thumbnails/sample.webp'), 'image/webp');
  assert.equal(guessOgImageMimeType(''), 'image/png');
});
