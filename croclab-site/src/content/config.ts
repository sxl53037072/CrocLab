import { defineCollection, z } from 'astro:content';

const blogSchema = z.object({
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
});

const blog = defineCollection({ type: 'content', schema: blogSchema });
const blogZh = defineCollection({ type: 'content', schema: blogSchema });

export const collections = { blog, 'blog-zh': blogZh };
