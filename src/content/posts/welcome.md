---
title: 欢迎来到我的博客
published: 2026-08-08
description: "博客全新改版：Astro + MDUI (Material Design 3)，Bento 卡片式布局。"
tags: ["博客", "Astro", "MDUI"]
category: 公告
draft: false
---

欢迎来到我的博客！

这里将记录我折腾代码与技术的过程。这个博客刚刚完成了全面改版：

## 技术栈

- **Astro 7** — 内容优先的静态站点框架
- **MDUI** — Material Design 3 (Material You) Web Components 组件库
- **Bento 布局** — 首页卡片式模块化设计
- **Pagefind** — 全文搜索
- **utterances** — GitHub Issue 驱动的评论

## 使用说明

文章存放在 `src/content/posts/` 目录，站点信息在 `src/consts.ts` 中配置。

推送 `main` 分支后自动部署到 GitHub Pages。

## 数学公式支持

博客支持 KaTeX 数学公式：

$$
E = mc^2
$$

行内公式如 $a^2 + b^2 = c^2$ 也可以使用。
