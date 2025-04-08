---
title: adding math equations
description: 'math support through remark math and rehype katex'
created: 2025-03-21 00:00
tags: [guide]
---

Adding mathematical equations to your content can greatly enhance technical documentation. Using [remark-math](https://github.com/remarkjs/remark-math) and [rehype-katex](https://github.com/remarkjs/remark-math/tree/main/packages/rehype-katex), you can easily incorporate beautiful math equations rendered by KaTeX.

### inline math

For inline equations, use single dollar signs `$...$`. The math will be rendered inline with your text.

Example: When discussing the Pythagorean theorem, we can write $a^2 + b^2 = c^2$ directly in a sentence.

### display math

For standalone equations, use double dollar signs `$$...$$`. This will center your equation on its own line.

Example:

$$
E = mc^2
$$

This is Einstein's famous mass-energy equivalence equation, where:

- $E$ is energy
- $m$ is mass
- $c$ is the speed of light in a vacuum

### math code blocks

For more complex mathematical content or multi-line equations, use math code blocks:

```math
\begin{align}
E &= mc^2 \\
&= m \times (299,792,458 \text{ m/s})^2
\end{align}
```

## additional tips

- Use `\` for escaping special characters in KaTeX
- For Greek letters, use commands like `\alpha`, `\beta`, etc.
- For fractions, use `\frac{numerator}{denominator}`

Remember that KaTeX supports a wide range of mathematical notation, making it perfect for documenting complex formulas and equations.
