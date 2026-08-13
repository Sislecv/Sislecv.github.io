import { getCollection, type CollectionEntry } from "astro:content";

export type Talk = CollectionEntry<"talks">;

export async function getAllTalks(): Promise<Talk[]> {
	const talks = await getCollection("talks");
	return talks.sort(
		(a, b) =>
			new Date(b.data.published).getTime() - new Date(a.data.published).getTime(),
	);
}

export function formatTalkDate(date: Date): string {
	return new Intl.DateTimeFormat("zh-CN", {
		year: "numeric",
		month: "long",
		day: "numeric",
		hour: "2-digit",
		minute: "2-digit",
	}).format(date);
}
