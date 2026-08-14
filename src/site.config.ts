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

// 图集已迁移到 src/content/gallery/ (可通过 Decap CMS /admin 管理)
// 每张图一个 .md 文件:src/alt/order/featured,见 src/lib/gallery.ts

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
	"github",
	"talks",
] as const;

// 自定义卡片（追加到首页磁贴网格，可随意增删）
// id: 唯一标识（小写英文）；icon: 预置图标名或图片路径（/ 或 http 开头为图片）
// 预置图标：star/favorite/settings/info/link/bookmark/thumb-up/notifications/visibility/calendar-month/dashboard/insights/auto-awesome
// x/y/w/h: 网格位置与大小（8 列网格，w 最大 8；h 单位约 88px）
// href: 点击跳转链接（可选）；title/text: 卡片文字（可选）
// 自定义卡片已注释（不显示）。如需启用，取消注释并按需修改：
// export const customCards: readonly CustomCard[] = [
// 	{
// 		id: "custom-star",
// 		icon: "star",
// 		title: "收藏",
// 		href: "https://example.com",
// 		x: 0,
// 		y: 13,
// 		w: 2,
// 		h: 2,
// 	},
// ] as const;
// 空数组兜底：index.astro 会 import customCards，注释后仍需导出空数组
export type CustomCard = {
	id: string;
	icon?: string;
	title?: string;
	text?: string;
	href?: string;
	x: number;
	y: number;
	w: number;
	h: number;
};
export const customCards: readonly CustomCard[] = [];

// 首页 GitHub 项目便签卡片（静态配置，手写维护）
// name: 项目名；description: 一行简介；url: 仓库链接
// lang: 主语言；stars: star 数
// color: 可选，自定义便签底色（十六进制）；不填则用 MD3 表面色四档（深浅色自动适配）
export type GithubProject = {
	name: string;
	description: string;
	url: string;
	lang: string;
	stars: number;
	color?: string;
};
export const githubProjects: readonly GithubProject[] = [
	{
		name: "md2img",
		description: "中文 Markdown 转图片工具：中英混排优化、5 套主题、一键导出社交分享图",
		url: "https://github.com/Sislecv/md2img",
		lang: "TypeScript",
		stars: 3,
	},
	{
		name: "Sislecv.github.io",
		description: "基于 Astro + MDUI 的个人博客",
		url: "https://github.com/Sislecv/Sislecv.github.io",
		lang: "Astro",
		stars: 0,
	},
	{
		name: "droidCLI",
		description: "Python 命令行小工具",
		url: "https://github.com/Sislecv/droidCLI",
		lang: "Python",
		stars: 1,
	},
	{
		name: "ascii-blog",
		description: "ASCII 风格博客",
		url: "https://github.com/Sislecv/ascii-blog",
		lang: "JavaScript",
		stars: 0,
	},
] as const;

// 评论区（utterances 基于 GitHub Issues）
export const comments = {
	// 评论仓库（owner/repo，需已安装 utterances App）
	repo: "Sislecv/sislecv.github.io",
} as const;
