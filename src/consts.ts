export const SITE = {
	title: "Sislecv",
	description: "Sislecv 的个人博客",
	url: "https://sislecv.github.io",
	lang: "zh-CN",
	author: "Sislecv",
};

export const NAV_LINKS = [
	{ href: "/", label: "首页", icon: "home" },
	{ href: "/archive", label: "归档", icon: "archive" },
	{ href: "/tags", label: "标签", icon: "tag" },
	{ href: "/gallery", label: "图集", icon: "collections" },
	{ href: "/about", label: "关于", icon: "person" },
	{ href: "/search", label: "搜索", icon: "search" },
] as const;

export const SOCIAL_LINKS = [
	{
		label: "GitHub",
		url: "https://github.com/Sislecv",
	},
	{
		label: "RSS",
		url: "/rss.xml",
	},
] as const;

export const AVATAR = "/favicon/favicon-light-192.png";
