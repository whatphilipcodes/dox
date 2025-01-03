import { defineCollection, z } from 'astro:content';
import { frontLoader } from './utils/loader';

const log = defineCollection({
  loader: frontLoader({ base: './src/content/log', pattern: '**/*.{md,mdx}' }),
  schema: z.object({
    title: z.string().optional(), // needs to be optional for filename replacement
    created: z.coerce.date(),
    description: z.string().optional(),
    tags: z.array(z.string()).optional(),
    pubDate: z.coerce.date().optional(),
    updatedDate: z.coerce.date().optional(),
    heroImage: z.string().optional(),
  }),
});

export const collections = { log };
