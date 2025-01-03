import type { Loader, LoaderContext } from 'astro/loaders';
import { glob } from 'astro/loaders';
import { z } from 'astro:content';

export function frontLoader(options: {
  base: string;
  pattern: string;
}): Loader {
  return {
    name: 'front-loader',
    load: async (context: LoaderContext) => {
      const loader = glob({
        base: options.base,
        pattern: options.pattern,
      });

      try {
        const result = await loader.load(context);
        const storeEntries = context.store.entries();
        context.store.clear();

        for (const [key, value] of storeEntries) {
          context.logger.info(`Processing ${key}`);
          const title: string = value.data.title
            ? (value.data.title as string)
            : getTitle(value.filePath as string);
          const data = await context.parseData({
            id: key,
            data: {
              ...value.data,
              title: title,
            },
          });
          const digest = context.generateDigest(data);
          context.store.set({
            id: key,
            data: data,
            body: value.body,
            rendered: value.rendered,
            deferredRender: value.deferredRender,
            filePath: value.filePath,
            digest: digest,
          });
        }

        return result;
      } catch (e) {
        context.logger.error(`Error loading: ${e}`);
        throw e;
      }
    },
    schema: z.object({
      title: z.string().optional(),
    }),
  };
}

function getTitle(filename: string): string {
  return filename.replace(/^.*[\\/]/, '').replace(/\.[^/.]+$/, '');
}
