import type { CollectionEntry } from 'astro:content';

type BlogFrontmatterWithOptionalSlug = {
  slug?: unknown;
};

export function getBlogSlug(entry: CollectionEntry<'blog'>): string {
  const frontmatter = entry.data as BlogFrontmatterWithOptionalSlug;
  const slugFromFrontmatter =
    typeof frontmatter.slug === 'string' ? frontmatter.slug.trim() : undefined;

  if (slugFromFrontmatter) {
    return slugFromFrontmatter;
  }

  return entry.slug;
}
