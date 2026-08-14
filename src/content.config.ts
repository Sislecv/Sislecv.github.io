import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const posts = defineCollection({
	loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/posts" }),
	schema: z.object({
		title: z.string(),
		published: z.date(),
		updated: z.date().optional(),
		draft: z.boolean().optional().default(false),
		description: z.string().optional().default(""),
		image: z.string().optional().default(""),
		tags: z.array(z.string()).optional().default([]),
		category: z.string().optional().nullable().default(""),
		lang: z.string().optional().default(""),
	}),
});

const talks = defineCollection({
	loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/talks" }),
	schema: z.object({
		// coerce:兼容 Decap 输出的多种日期字符串(含 +0800 无冒号时区)
		published: z.coerce.date(),
	}),
});

export const collections = { posts, talks };
