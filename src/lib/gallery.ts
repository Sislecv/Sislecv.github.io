import { getCollection, type CollectionEntry } from "astro:content";

export type GalleryImage = CollectionEntry<"gallery">;

export async function getAllGalleryImages(): Promise<GalleryImage[]> {
	const images = await getCollection("gallery");
	return images.sort((a, b) => a.data.order - b.data.order);
}

/** 首页堆叠卡:featured 前 4 张 */
export async function getFeaturedGalleryImages(): Promise<GalleryImage[]> {
	const all = await getAllGalleryImages();
	return all.filter((img) => img.data.featured).slice(0, 4);
}
