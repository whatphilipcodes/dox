declare module 'rehype-wrap-all' {
  import type { Plugin, Transformer } from 'unified';
  import type { Root, Element } from 'hast';

  interface WrapOptions {
    selector: string;
    wrapper?: string | Element;
  }

  type RehypeWrapAll = Plugin<[WrapOptions?], Root>;

  const wrapAll: RehypeWrapAll;

  export default wrapAll;
}
