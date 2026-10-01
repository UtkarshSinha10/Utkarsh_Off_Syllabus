This file is a **draft** example. It only appears when you preview the site locally, so you can copy it as a starting point for real essays.

Write the body in plain Markdown. The title, date and tags come from `essays/index.js`, so don't repeat the title here.

## Headings build the outline

Every `## Heading` and `### Sub-heading` appears in the **On this page** outline next to the essay, once there are at least two of them. Readers can click to jump, and the link can be shared.

### A sub-heading

Use these to break a long section into smaller parts.

## Text formatting

- **Bold** with `**double asterisks**`
- *Italic* with `*single asterisks*`
- [Links](https://www.youtube.com/channel/UCdNdQLkunF5r1ROqwlkOKAQ) with `[text](url)`
- `Inline code` with backticks

> Block quotes start with `>`. Good for a line you want to stand out.

1. Numbered lists
2. Work like this

## Code and images

```js
// Fenced code blocks for system design or DSA snippets
function twoSum(nums, target) {
  const seen = new Map();
  for (let i = 0; i < nums.length; i++) {
    if (seen.has(target - nums[i])) return [seen.get(target - nums[i]), i];
    seen.set(nums[i], i);
  }
}
```

Put images in `assets/img/` and reference them like this:

![Mountains](assets/img/mountains.jpg)

---

A line of three dashes draws a divider, like the one above.
