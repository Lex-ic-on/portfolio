import path from 'node:path';
import { visit } from 'unist-util-visit';
import type { Node } from 'unist';
import type { Text } from 'mdast';

import { resolveObsidianImageEmbed } from './obsidian-image-helpers';

interface WikiLinkMatch {
  type: 'same' | 'cross' | 'image';
  collection?: string;
  title: string;
  originalText: string;
  startIndex: number;
  endIndex: number;
  imageVariant?: 'directive' | 'embed';
  altText?: string;
}

// Slugify function to convert titles to slugs
function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function parseWikiLink(match: RegExpExecArray): WikiLinkMatch | null {
  const raw = match[0];
  const content = match[1].trim();
  const [startIndex, endIndex] = [match.index, match.index + raw.length];

  if (!content) {
    return null;
  }

  // Handle Obsidian-style image embeds `![[image.png]]`
  if (raw.startsWith('!')) {
    const [, altRaw] = content.split('|');
    return {
      type: 'image',
      title: content,
      originalText: raw,
      startIndex,
      endIndex,
      imageVariant: 'embed',
      altText: altRaw?.trim() || undefined,
    };
  }

  // Check for image directive links like [[image:filename.png]]
  if (content.startsWith('image:')) {
    return {
      type: 'image',
      title: content.slice(6), // Remove 'image:' prefix
      originalText: raw,
      startIndex,
      endIndex,
      imageVariant: 'directive',
    };
  }

  // Check for cross-collection links
  const crossLinkMatch = content.match(/^(blog|works):(.+)$/);
  if (crossLinkMatch) {
    return {
      type: 'cross',
      collection: crossLinkMatch[1],
      title: crossLinkMatch[2],
      originalText: raw,
      startIndex,
      endIndex,
    };
  }

  // Same collection link
  return {
    type: 'same',
    title: content,
    originalText: raw,
    startIndex,
    endIndex,
  };
}

function createLinkNode(
  match: WikiLinkMatch,
  currentCollection: string = 'blog',
  slug?: string,
) {
  if (match.type === 'image') {
    if (match.imageVariant === 'embed') {
      if (!slug) {
        return {
          type: 'text',
          value: match.originalText,
        };
      }

      const resolved = resolveObsidianImageEmbed(match.title, {
        slug,
        collection: currentCollection,
      });

      if (!resolved) {
        return {
          type: 'text',
          value: match.originalText,
        };
      }

      return {
        type: 'image',
        url: resolved.url,
        alt: match.altText || resolved.alt,
      };
    }

    // Handle image directive links
    const imagePath = `/images/${currentCollection}/${match.title}`;
    return {
      type: 'image',
      url: imagePath,
      alt: match.title,
    };
  }

  // Handle regular links
  const collection = match.collection || currentCollection;
  const linkSlug = slugify(match.title);
  const url = `/${collection}/${linkSlug}`;

  return {
    type: 'link',
    url,
    title: match.title,
    children: [
      {
        type: 'text',
        value: match.title,
      },
    ],
  };
}

function extractSlugFromFile(file: { data?: unknown; history?: string[]; path?: string }): string | undefined {
  const astroData = (file as { data?: { astro?: { frontmatter?: { slug?: unknown } } } }).data?.astro;
  const slugValue = astroData?.frontmatter?.slug;

  if (typeof slugValue === 'string' && slugValue.trim().length > 0) {
    return slugValue.trim();
  }

  const filePath = file.history?.[0] || file.path;
  if (typeof filePath === 'string' && filePath.length > 0) {
    return path.basename(filePath, path.extname(filePath));
  }

  return undefined;
}

export function remarkWikiLinks(options: { collection?: string } = {}) {
  return function transformer(tree: Node, file: unknown) {
    const slug = extractSlugFromFile((file || {}) as { data?: unknown; history?: string[]; path?: string });
    visit(tree, 'text', (node: Text, index, parent) => {
      if (!parent || typeof index !== 'number') return;

      const text = node.value;
      const wikiLinks: WikiLinkMatch[] = [];

      // Find all wiki links in the text
      let match;
      const regex = /!?\[\[([^\]]+)\]\]/g;
      while ((match = regex.exec(text)) !== null) {
        const parsed = parseWikiLink(match);
        if (parsed) {
          wikiLinks.push(parsed);
        }
      }

      if (wikiLinks.length === 0) return;

      // Split text and create new nodes
      const newNodes = [];
      let lastIndex = 0;

      for (const wikiLink of wikiLinks) {
        // Add text before the wiki link
        if (wikiLink.startIndex > lastIndex) {
          newNodes.push({
            type: 'text',
            value: text.slice(lastIndex, wikiLink.startIndex),
          });
        }

        // Add the processed link
        newNodes.push(createLinkNode(wikiLink, options.collection, slug));

        lastIndex = wikiLink.endIndex;
      }

      // Add remaining text
      if (lastIndex < text.length) {
        newNodes.push({
          type: 'text',
          value: text.slice(lastIndex),
        });
      }

      // Replace the text node with new nodes
      parent.children.splice(index, 1, ...newNodes);
    });
  };
}
