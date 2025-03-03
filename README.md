<h1><img src="./public/favicon.svg" alt="logo" width="80" align="center"/>&nbsp;&nbsp;&nbsp;dox</h1>

Simple template to create documentation-style static websites from .md(x) files.
More in-depth information can be found [here](https://dox.whatphilipdoes.com/log/04-dox-release/).

Features:

- Markdown and MDX as content source
- Prebuilt Routes
  - Home
  - Development Log
  - Download
  - Roadmap
- FTP Deployment already set up
  - directly via script
  - workflow for GitHub Actions
- Syntax highlighting in code blocks courtesy of [`Expressive Code`](https://expressive-code.com/)

---

Based on [Astro's](https://astro.build/) [Blog Example](https://stackblitz.com/github/withastro/astro/tree/latest/examples/blog), the docs are built using [React](https://react.dev/), [Vite](https://vitejs.dev/), [MDX](https://mdxjs.com/), and [Tailwind CSS](https://tailwindcss.com/). Refer to respective documentations for more information.

---

### known issues

- [ ] HMR issues with `tailwindcss v4` and `vite`
  - Since tailwind v4 changed the way the vite integration worked I have been having issues with HMR. My nested CSS import structure (not ideal but the easiest way to style Markdown content coming from Astro) HMR stopped working completely requiring a full dev server restart. Since that is not acceptable for styling where iterating through a lot of versions is necessary I restructured the tailwind and CSS imports in a way that works with HMR. This however introduces some console errors that come up when changing CSS files during dev server runtime:
    - Laden fehlgeschlagen für das Modul mit der Quelle "url/to/changed/file.css".
    - [vite] TypeError: error loading dynamically imported module: url/to/changed/file.css
    - [vite] Failed to reload path/to/changed/file.css. This could be due to syntax errors or importing non-existent modules. (see errors above)
    - Source-Map-Fehler: request failed with status 404
      Ressourcen-Adresse: useless/url
      Source-Map-Adresse: installHook.js.map
    - Source-Map-Fehler: can't access property "sources", map is undefined
      Ressourcen-Adresse: useless/url
      Source-Map-Adresse: react_devtools_backend_compact.js.map
  - while this is annoying to look at this way HMR does work and for the time being this seems to be a fair compromise.
- [x] `fixed` : ~~Tailwindcss v4 and Expressive Code~~
  - Expressive Code briefly generates CSS that Tailwind tries to parse. When Tailwind encounters those transient files, it can trigger a path error. This causes occasional failures until the generated file no longer exists or is excluded from scanning.
  - Error:
    ```
    Astro detected an unhandled rejection. Here's the stack trace:
    TypeError [ERR_INVALID_ARG_VALUE]: The argument 'path' must be a string, Uint8Array, or URL without null bytes. Received '/Users/philip/Documents/Repos/dox/\x00/_astro/ec.1zj23.css'
      at Object.stat (node:internal/fs/promises:1038:18)
      at C.addBuildDependency (file:///Users/philip/Documents/Repos/dox/node_modules/.pnpm/@tailwindcss+vite@4.0.8_vite@6.1.1_jiti@2.4.2_lightningcss@1.29.1_yaml@2.7.0_/node_modules/@tailwindcss/vite/dist/index.mjs:1:5234)
      at C.generate (file:///Users/philip/Documents/Repos/dox/node_modules/.pnpm/@tailwindcss+vite@4.0.8_vite@6.1.1_jiti@2.4.2_lightningcss@1.29.1_yaml@2.7.0_/node_modules/@tailwindcss/vite/dist/index.mjs:1:3810)
      at TransformPluginContext.transform (file:///Users/philip/Documents/Repos/dox/node_modules/.pnpm/@tailwindcss+vite@4.0.8_vite@6.1.1_jiti@2.4.2_lightningcss@1.29.1_yaml@2.7.0_/node_modules/@tailwindcss/vite/dist/index.mjs:1:1967)
      at EnvironmentPluginContainer.transform (file:///Users/philip/Documents/Repos/dox/node_modules/.pnpm/vite@6.1.1_jiti@2.4.2_lightningcss@1.29.1_yaml@2.7.0/node_modules/vite/dist/node/chunks/dep-Cg8OuIew.js:48466:19)
      at process.processTicksAndRejections (node:internal/process/task_queues:105:5)
      at async loadAndTransform (file:///Users/philip/Documents/Repos/dox/node_modules/.pnpm/vite@6.1.1_jiti@2.4.2_lightningcss@1.29.1_yaml@2.7.0/node_modules/vite/dist/node/chunks/dep-Cg8OuIew.js:42166:27)
    ```
  - Workaround:<br>
    Reload the page (`cmd + r`)
