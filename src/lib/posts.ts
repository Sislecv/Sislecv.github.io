import { getCollection, type CollectionEntry } from "astro:content";
import readingTime from "reading-time";

export type Post = CollectionEntry<"posts">;

export async function getAllPosts(): Promise<Post[]> {
	const posts = await getCollection("posts");
	return posts
		.filter((post) => !post.data.draft)
		.sort(
			(a, b) =>
				new Date(b.data.published).getTime() - new Date(a.data.published).getTime(),
		);
}

export function getPostSlug(post: Post): string {
	// Astro 7 glob loader exposes `id` (path relative to base) instead of `slug`
	return post.id.replace(/\.(md|mdx)$/i, "");
}

export function getPostUrl(slug: string): string {
	return `/posts/${slug}/`;
}

export function formatDate(date: Date): string {
	return new Intl.DateTimeFormat("zh-CN", {
		year: "numeric",
		month: "long",
		day: "numeric",
	}).format(date);
}

export function getReadingTime(post: Post): string {
	const minutes = readingTime(post.body ?? "").minutes;
	return `${Math.max(1, Math.round(minutes))} 分钟`;
}

export function getTags(posts: Post[]): Map<string, number> {
	const counts = new Map<string, number>();
	for (const post of posts) {
		for (const tag of post.data.tags) {
			counts.set(tag, (counts.get(tag) ?? 0) + 1);
		}
	}
	return new Map([...counts.entries()].sort((a, b) => b[1] - a[1]));
}

export function getCategories(posts: Post[]): Map<string, number> {
	const counts = new Map<string, number>();
	for (const post of posts) {
		const cat = post.data.category;
		if (!cat) continue;
		counts.set(cat, (counts.get(cat) ?? 0) + 1);
	}
	return counts;
}

export function getStats(posts: Post[]) {
	const words = posts.reduce((acc, post) => acc + (post.body?.split(/\s+/).length ?? 0), 0);
	return {
		postCount: posts.length,
		tagCount: getTags(posts).size,
		totalWords: words,
	};
}
