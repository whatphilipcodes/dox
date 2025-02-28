---
title: download knoto
created: 2025-02-28
description: downloads
active: true
---

All the text above the downloads is another Markdown file you can optionally add for additional information. If you want to disable this, set the `active` prop in `./src/content/download.md` to false.

### guide

This download section automatically tries to fetch releases from the `GITHUB_URL` you defined in `./src/consts.ts`. This will only work with public repositories. If your release does not include downloadable build artifacts this page will show `view release` links to open the corresponding tag on Github.
