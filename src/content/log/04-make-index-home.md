---
title: make your index a home
description: 'landing page styling guide'
created: 2025-02-22 00:00
tags: [cc-one, guide]
draft: false
---

> Here you can control what users will see when they open your documentation.

Just like many other pages in this template, the `index` file is also available for you to style freely using MDX.
The default setup looks like this:

```mdx title="./src/content/index.mdx"
---
title: dox
created: 2025-02-28
description: homepage
---

import LandingPrompt from '../components/landingModules/LandingPrompt.astro';
import Artifact from '../components/react/Artifact';

<LandingPrompt startRef='/log/04-dox-release/#get-started'>
  <div class='hidden md:block'>
    <Artifact svgRef='/color-reference.svg' client:load />
  </div>
  <Fragment slot='prompt-title'>welcome to the dox</Fragment>
  {/* slots in MDX have to be on the same line (despite your formatter maybe trying to split them, otherwise the new line is interpreted as a Markdown paragraph and slotted as <p>yourcontent</p>) */}
  <Fragment slot='prompt-subtitle'>
    Create beautiful documentations for your projects with ease
  </Fragment>
</LandingPrompt>
```

In `./components/landingModules`, I will add more modules I think can be useful when building a landing page for your documentation so it might be worth it to have a look at this again in the future.
