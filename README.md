# sislecv.github.io

基于 [Astro](https://astro.build) 的个人静态博客，部署于 GitHub Pages。

## 技术栈

- **Astro 7** — 内容优先的静态站点框架，默认零 JS
- **MDX** — 支持在 Markdown 中嵌入组件
- **RSS / Sitemap** — 内置订阅与 SEO 支持

## 本地开发

```sh
npm install
npm run dev      # 开发服务器 http://localhost:4321
npm run build    # 构建到 dist/
npm run preview  # 本地预览构建产物
```

## 写文章

在 `src/content/blog/` 下新建 `.md` / `.mdx` 文件即可，frontmatter 结构参考现有示例文章。

## 部署

推送到 `main` 分支后，GitHub Actions（`.github/workflows/deploy.yml`）自动构建并部署到 https://sislecv.github.io 。
