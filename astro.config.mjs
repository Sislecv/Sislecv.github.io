import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import { unified } from "@astrojs/markdown-remark";
import { defineConfig } from "astro/config";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeKatex from "rehype-katex";
import rehypeSlug from "rehype-slug";
import remarkMath from "remark-math";

// https://astro.build/config
export default defineConfig({
	site: "https://sislecv.github.io",
	markdown: {
		processor: unified({
			remarkPlugins: [remarkMath],
			rehypePlugins: [
				rehypeSlug,
				[rehypeAutolinkHeadings, { behavior: "wrap" }],
				rehypeKatex,
			],
		}),
	},
	integrations: [mdx(), sitemap()],
});
