import rss from "@astrojs/rss";
import type { APIContext } from "astro";
import { getAllPosts, getPostSlug, getPostUrl } from "../lib/posts";
import { SITE } from "../consts";

export async function GET(context: APIContext) {
	const posts = await getAllPosts();
	return rss({
		title: SITE.title,
		description: SITE.description,
		site: context.site!,
		items: posts.map((post) => ({
			title: post.data.title,
			pubDate: post.data.published,
			description: post.data.description,
			link: getPostUrl(getPostSlug(post)),
			categories: post.data.tags,
		})),
	});
}
