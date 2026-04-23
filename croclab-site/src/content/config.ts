import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.date(),
    updatedDate: z.date().optional(),
    author: z.string().default('CrocLab'),
    tag: z.string(),
    readTime: z.number(),
    heroImage: z.string().optional(),
    ogImage: z.string().optional(),
    relatedProduct: z.string().optional(),
  }),
});

export const collections = { blog };
