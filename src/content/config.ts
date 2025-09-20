import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.date(),
    draft: z.boolean().default(false),
  }),
});

const works = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    client: z.string(),
    date: z.date(),
    thumbnail: z.string().optional(),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
  }),
});

export const collections = {
  blog,
  works,
};