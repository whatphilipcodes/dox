import { defineCollection, z, type CollectionEntry } from 'astro:content';
import { glob } from 'astro/loaders';

const baseSchema = z.object({
  title: z.string(), // needs to be optional for filename replacement
  created: z.coerce.date(),
  description: z.string().optional(),
  tags: z.array(z.string()).optional(),
});

const timeStep = z.object({
  title: z.string(), // needs to be optional for filename replacement
  start: z.coerce.date(),
  due: z.coerce.date(),
  logEntry: z.string().optional(),
  tags: z.array(z.string()).optional(),
  status: z.enum(['planned', 'active', 'completed']),
});

const basePattern = '**/*.{md,mdx}';

// --- Collections --- //

const download = defineCollection({
  loader: glob({ base: './src/content/download', pattern: basePattern }),
  schema: baseSchema,
});

const log = defineCollection({
  loader: glob({ base: './src/content/log', pattern: basePattern }),
  schema: baseSchema,
});

const manual = defineCollection({
  loader: glob({ base: './src/content/manual', pattern: basePattern }),
  schema: baseSchema,
});

const roadmap = defineCollection({
  loader: glob({
    base: './src/content/roadmap',
    pattern: basePattern,
  }),
  schema: timeStep,
});

export const collections = { download, log, manual, roadmap };
