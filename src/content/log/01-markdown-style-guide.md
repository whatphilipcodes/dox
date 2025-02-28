---
title: Markdown Style Guide
description: 'Here is a sample of some basic Markdown syntax that can be used when writing Markdown content in Astro.'
created: 2025-02-01 00:00
---

### Basic Text Formatting

Plain text is written normally without any special characters. To format text in special ways, we use simple markers:

**Bold text** is created by wrapping words in double asterisks or double underscores
_Italic text_ uses single asterisks or single underscores
**_Bold and italic_** combines both with triple asterisks
`Inline code` is wrapped in backticks

We will come back later to this[^1]

### Headers

Headers use hashtags (#) followed by a single space. More hashtags create lower-level headers:

# Header 1

## Header 2

### Header 3

#### Header 4

### Links and Images

Links use square brackets for the text followed by parentheses for the URL:
[Link text](https://example.com)

Images are similar but start with an exclamation mark:

![An empty paper around which lay three brushes, a color tube and a color palette](../../assets/img/placeholder.jpg)

### Lists

Unordered lists use asterisks, plus signs, or hyphens followed by a space:

- First bullet point
- Second bullet point
  - Nested point (indent with two spaces)
  - Another nested point
    - Even deeper nesting

Ordered lists use numbers followed by a period and space:

1. First item
2. Second item
   1. Nested numbered item
   2. Another nested item

### Code Blocks

For multiple lines of code, use triple backticks with an optional language specification:

```python
def hello_world():
    print("Hello, world!")
```

### Quotes

Blockquotes use a greater-than symbol followed by a space:

> This is a blockquoted paragraph

### Tables

Tables use pipes and hyphens:

| Header 1 | Header 2 |
| -------- | -------- |
| Cell 1   | Cell 2   |
| Cell 3   | Cell 4   |

### Horizontal Rules

Create horizontal lines using three or more hyphens, asterisks, or underscores:

---

### Advanced Features

#### Task Lists

- [x] Completed task
- [ ] Incomplete task

#### Strikethrough

~~Strikethrough text~~ uses double tildes.

#### Footnotes

Remember when I said we will come back later to this?

[^1]: This is the footnote content.
