import { defineCollection, z } from 'astro:content';
import { frontLoader } from './utils/loader';

const baseSchema = z.object({
  title: z.string().optional(), // needs to be optional for filename replacement
  created: z.coerce.date(),
  description: z.string().optional(),
  tags: z.array(z.string()).optional(),
});

const timeStep = z.object({
  title: z.string().optional(),
  start: z.coerce.date(),
  due: z.coerce.date(),
  logEntry: z.string().optional(),
  tags: z.array(z.string()).optional(),
  status: z.enum(['planned', 'active', 'completed']),
});

const basePattern = '**/*.{md,mdx}';

const download = defineCollection({
  loader: frontLoader({ base: './src/content/download', pattern: basePattern }),
  schema: baseSchema,
});

const log = defineCollection({
  loader: frontLoader({ base: './src/content/log', pattern: basePattern }),
  schema: baseSchema,
});

const manual = defineCollection({
  loader: frontLoader({ base: './src/content/manual', pattern: basePattern }),
  schema: baseSchema,
});

const roadmap = defineCollection({
  loader: frontLoader({
    base: './src/content/roadmap',
    pattern: basePattern,
  }),
  schema: timeStep,
});

export const collections = { download, log, manual, roadmap };
