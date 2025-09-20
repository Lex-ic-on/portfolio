import { visit } from 'unist-util-visit';
import type { Node } from 'unist';
import type { Text } from 'mdast';

interface WikiLinkMatch {
  type: 'same' | 'cross' | 'image';
  collection?: string;
  title: string;
  originalText: string;
  startIndex: number;
  endIndex: number;
}

// Slugify function to convert titles to slugs
function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function parseWikiLink(text: string): WikiLinkMatch | null {
  const wikiLinkRegex = /\[\[([^\]]+)\]\]/g;
  const match = wikiLinkRegex.exec(text);

  if (!match) return null;

  const content = match[1];
  const [startIndex, endIndex] = [match.index, match.index + match[0].length];

  // Check for image links
  if (content.startsWith('image:')) {
    return {
      type: 'image',
      title: content.slice(6), // Remove 'image:' prefix
      originalText: match[0],
      startIndex,
      endIndex,
    };
  }

  // Check for cross-collection links
  const crossLinkMatch = content.match(/^(blog|works):(.+)$/);
  if (crossLinkMatch) {
    return {
      type: 'cross',
      collection: crossLinkMatch[1],
      title: crossLinkMatch[2],
      originalText: match[0],
      startIndex,
      endIndex,
    };
  }

  // Same collection link
  return {
    type: 'same',
    title: content,
    originalText: match[0],
    startIndex,
    endIndex,
  };
}

function createLinkNode(match: WikiLinkMatch, currentCollection: string = 'blog') {
  if (match.type === 'image') {
    // Handle image links
    const imagePath = `/images/${currentCollection}/${match.title}`;
    return {
      type: 'image',
      url: imagePath,
      alt: match.title,
    };
  }

  // Handle regular links
  const collection = match.collection || currentCollection;
  const slug = slugify(match.title);
  const url = `/${collection}/${slug}`;

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

export function remarkWikiLinks(options: { collection?: string } = {}) {
  return function transformer(tree: Node) {
    visit(tree, 'text', (node: Text, index, parent) => {
      if (!parent || typeof index !== 'number') return;

      const text = node.value;
      const wikiLinks: WikiLinkMatch[] = [];

      // Find all wiki links in the text
      let match;
      const regex = /\[\[([^\]]+)\]\]/g;
      while ((match = regex.exec(text)) !== null) {
        const parsed = parseWikiLink(match[0]);
        if (parsed) {
          parsed.startIndex = match.index;
          parsed.endIndex = match.index + match[0].length;
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
        newNodes.push(createLinkNode(wikiLink, options.collection));

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