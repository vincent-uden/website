import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const blog = defineCollection({
  // Load Markdown and MDX files in the `src/content/blog/` directory.
  loader: glob({ base: "./src/content/blog", pattern: "**/*.{md,mdx}" }),
  // Type-check frontmatter using a schema
  schema: ({}) =>
    z.object({
      layout: z.string(),
      title: z.string(),
      preview: z.string(),
      date: z.string(),
      time: z.string(),
      timestamp: z.number(),
    }),
});

export const collections = { blog };
