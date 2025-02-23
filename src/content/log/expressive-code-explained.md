---
title: Expressive Code Explained
description: 'Small demo of Expressive Code features on this template'
created: 2025-01-14 00:37
---

# Standard Markdown

The stuff you know from other Markdown also works here. You should however take into account that `inline code blocks` will not be processed by `Expressive Code` and are instead only styled via the `.code` selector in `./src/styles/global.css`.

```py
def hello_world():
    print('Hello, World!')
```

This is what a standard code block looks like.

# Expressive Code

Using the `Expressive Code` features you can add a bit more fancy to your code blocks.

```py title="shepherd_tone.py"
def shepherd_tone():
    print('This is a Shepherd Tone')
```

As you can see there now is a filename displayed. If you want to specify the kind of frame around your code block you can use the `frame` property.
For more information please refer to the [docs](https://expressive-code.com/key-features/frames/).

```sh
echo 'This is a shell script displayed in a terminal frame by default'
```

```powershell title="hello title"
Write-Output "This one has a title!"
```

```sh title="install.sh" frame="code"
echo 'This is a shell script displayed in a code frame thanks to the override'
```
