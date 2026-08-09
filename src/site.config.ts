// ============================================================
// 站点配置文件
// 修改此文件即可自定义你的博客，无需改动任何组件代码。
// 改完保存后推送到 main 分支即可自动部署。
// ============================================================

export const site = {
	// 站点名称（导航栏、页脚显示）
	title: "Sislecv",
	// 一句话简介（个人卡片显示）
	description: "Sislecv 的个人博客",
	// 部署地址（不要以 / 结尾）
	url: "https://sislecv.github.io",
	// 页面语言
	lang: "zh-CN",
	// 作者名（页脚版权）
	author: "Sislecv",
	// 头像路径（放 public/ 下的文件，或外链）
	avatar: "/favicon/favicon-light-192.png",
} as const;

// 导航栏菜单（页面底部导航卡）
// icon 使用 Material Symbols 图标名：https://icones.js.org/collection/material-symbols
// 可用图标已内置：home/archive/tag/person/search/collections 等（--outlined 变体）
export const nav = [
	{ href: "/", label: "首页", icon: "home" },
	{ href: "/archive", label: "归档", icon: "archive" },
	{ href: "/tags", label: "标签", icon: "tag" },
	{ href: "/gallery", label: "图集", icon: "collections" },
	{ href: "/about", label: "关于", icon: "person" },
	{ href: "/search", label: "搜索", icon: "search" },
] as const;

// 社交链接（个人卡片与页脚的按钮）
export const social = [
	{ label: "GitHub", url: "https://github.com/Sislecv" },
	{ label: "RSS", url: "/rss.xml" },
] as const;

// 主题外观
export const theme = {
	// 默认主题色（Material Design 3 主色）
	defaultColor: "#0b57d0",
	// 首页"外观"卡片中的色板（可增删改）
	// name: 色点提示文字；color: 十六进制颜色
	schemes: [
		{ name: "蓝", color: "#0b57d0" },
		{ name: "靛蓝", color: "#2f3aa8" },
		{ name: "紫", color: "#9334e6" },
		{ name: "粉", color: "#c2185b" },
		{ name: "红", color: "#b3261e" },
		{ name: "橙", color: "#b25000" },
		{ name: "绿", color: "#1b873b" },
		{ name: "青", color: "#006a6a" },
	],
} as const;

// 首页技术栈卡片（自动横向滚动）
// icon: 图片路径（放 public/stack/ 下，推荐 128x128 的 SVG/PNG）
// url: 点击跳转链接
export const techStack = [
	{ name: "Python", icon: "/stack/python.svg", url: "https://www.python.org/" },
	{ name: "Node.js", icon: "/stack/nodedotjs.svg", url: "https://nodejs.org/" },
	{ name: "Astro", icon: "/stack/astro.svg", url: "https://astro.build/" },
	{ name: "OMP", icon: "/stack/omp.png", url: "https://opencode.ai/" },
] as const;

// 图集
export const gallery = {
	// 首页堆叠图集卡显示的图片（最多 4 张，src 支持外链或本地路径）
	stackImages: [
		{ src: "https://picsum.photos/seed/sislecv-1/320/224", alt: "图集 1" },
		{ src: "https://picsum.photos/seed/sislecv-2/320/224", alt: "图集 2" },
		{ src: "https://picsum.photos/seed/sislecv-3/320/224", alt: "图集 3" },
		{ src: "https://picsum.photos/seed/sislecv-4/320/224", alt: "图集 4" },
	],
	// /gallery 页面图片墙（src 支持外链或本地路径）
	photos: [
		{ src: "https://picsum.photos/seed/sislecv-1/600/420" },
		{ src: "https://picsum.photos/seed/sislecv-2/420/560" },
		{ src: "https://picsum.photos/seed/sislecv-3/560/420" },
		{ src: "https://picsum.photos/seed/sislecv-4/420/420" },
		{ src: "https://picsum.photos/seed/sislecv-5/600/400" },
		{ src: "https://picsum.photos/seed/sislecv-6/400/600" },
		{ src: "https://picsum.photos/seed/sislecv-7/560/560" },
		{ src: "https://picsum.photos/seed/sislecv-8/420/320" },
		{ src: "https://picsum.photos/seed/sislecv-9/600/450" },
		{ src: "https://picsum.photos/seed/sislecv-10/450/450" },
		{ src: "https://picsum.photos/seed/sislecv-11/520/390" },
		{ src: "https://picsum.photos/seed/sislecv-12/390/520" },
	],
} as const;

// 首页磁贴（可拖动的卡片）
// 在此增删磁贴 id 控制首页显示哪些卡片
export const homeTiles = [
	"profile",
	"appearance",
	"emoji",
	"contribution",
	"search",
	"archive",
	"category",
	"tags",
	"tagcloud",
	"techstack",
	"gallery",
] as const;

// 评论区（utterances 基于 GitHub Issues）
export const comments = {
	// 评论仓库（owner/repo，需已安装 utterances App）
	repo: "Sislecv/sislecv.github.io",
} as const;
