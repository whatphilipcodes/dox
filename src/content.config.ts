import { type CollectionEntry, defineCollection, z } from 'astro:content'; // without type CollectionEntry things break (astro 5.4.1)
import { glob } from 'astro/loaders';

const baseSchema = z.object({
	title: z.string(),
	created: z.coerce.date(),
	description: z.string().optional(),
	tags: z.array(z.string()).optional(),
	draft: z.boolean().optional(),
});

const timeStepSchema = z.object({
	title: z.string(),
	start: z.coerce.date(),
	due: z.coerce.date(),
	logEntry: z.string().optional(),
	tags: z.array(z.string()).optional(),
	status: z.enum(['planned', 'active', 'completed']),
});

const deckSchema = z.object({
	title: z.string(),
	description: z.string().optional(),
	draft: z.boolean().optional(),
});

const basePattern = '**/*.{md,mdx}';

// --- Collections --- //

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
	schema: timeStepSchema,
});

const dex = defineCollection({
	loader: glob({ pattern: '**/*.mdx', base: './src/content/dex' }),
	schema: deckSchema,
});

export const collections = { log, manual, roadmap, dex };
