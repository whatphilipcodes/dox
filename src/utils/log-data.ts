// as seen here: https://github.com/jktrn/astro-erudite/blob/main/src/lib/data-utils.ts
import { getCollection, type CollectionEntry } from 'astro:content';

export const getAllLogs = async (): Promise<CollectionEntry<'log'>[]> => {
	const logs = await getCollection('log');
	return logs
		.filter((log) => !log.data.draft)
		.sort((a, b) => b.data.created.valueOf() - a.data.created.valueOf());
};

export const getAllTags = async (): Promise<Map<string, number>> => {
	const logs = await getAllLogs();
	return logs.reduce((acc, log) => {
		if (log.data.tags) {
			for (const tag of log.data.tags) {
				acc.set(tag, (acc.get(tag) || 0) + 1);
			}
		}
		return acc;
	}, new Map<string, number>());
};

export const getSortedTags = async (): Promise<
	{ tag: string; count: number }[]
> => {
	const tagCounts = await getAllTags();

	return [...tagCounts.entries()]
		.map(([tag, count]) => ({ tag, count }))
		.sort((a, b) => {
			const countDiff = b.count - a.count;
			return countDiff !== 0 ? countDiff : a.tag.localeCompare(b.tag);
		});
};

export const getLogsByTag = async (
	tag: string,
): Promise<CollectionEntry<'log'>[]> => {
	const logs = await getAllLogs();
	return logs.filter((log) => log.data.tags?.includes(tag));
};
