# Decap CMS 集成 — 设计文档

日期:2026-08-13
状态:已获用户批准(方案=Decap CMS + 自定义子域名 OAuth 代理,凭据=用户自注册 OAuth App)

## 目标

为博客(sislecv.github.io)集成 Decap CMS(开源 Git 系 CMS),提供 `/admin` 网页界面管理文章。保存即 commit 到 main,自动触发现有 GitHub Actions 部署。博客数据层零改动(文章仍是 `src/content/posts/*.md`)。

## 架构

```
浏览器 /admin (Decap CMS SPA,静态文件,托管于博客)
  │  登录弹窗 → base_url/auth
  ▼
CF Worker OAuth 代理 (cms.whoami.nx.kg 自定义子域名)
  │  /auth      → 302 跳 GitHub /login/oauth/authorize
  │  /callback  → 换 token → postMessage 回 Decap 弹窗
  ▼
GitHub OAuth App (用户注册,scopes: public_repo,user)
```

- 认证:GitHub OAuth App + CF Worker 代理(OAuth 端点不支持 CORS,必须有代理;官方推荐此模式)
- 代理代码:基于 sterlingwes/decap-proxy 的 Cloudflare Worker(约 100 行,零依赖)
- 博客侧改动:`public/admin/` 两个静态文件(index.html + config.yml),不动任何 src/ 代码

## 组件

### 1. 博客端 `public/admin/index.html`
加载 Decap CMS 脚本(jsdelivr CDN,国内可达已验证),`<link rel="cms-config-url" href="config.yml">`。

### 2. 博客端 `public/admin/config.yml`
```yaml
backend:
  name: github
  repo: Sislecv/sislecv.github.io
  branch: main
  base_url: https://cms.whoami.nx.kg
  auth_endpoint: /auth
site_url: https://whoami.nx.kg
display_url: https://whoami.nx.kg
media_folder: public/images
public_folder: /images
collections:
  posts:
    folder: src/content/posts
    create: true
    fields: title/published/updated/draft/description/tags/category/lang/body
```
fields 严格对应 `src/content.config.ts` 的 posts schema(published 用 datetime widget,输出 ISO 与 z.date() 兼容;draft 用 boolean widget;tags 用 list widget)。

### 3. CF Worker `decap-proxy`(独立项目目录 `~/decap-proxy/`)
- `wrangler.toml`:name=decap-proxy,route=cms.whoami.nx.kg(custom_domain)
- secrets:`GITHUB_OAUTH_ID`、`GITHUB_OAUTH_SECRET`(用户注册 OAuth App 后提供)
- 处理 `/auth`、`/callback`,其他路径返回 Hello

## 部署步骤(用户操作,写入 README)

1. GitHub 注册 OAuth App:Homepage URL = `https://cms.whoami.nx.kg`,Callback URL = `https://cms.whoami.nx.kg/callback`
2. 提供 Client ID / Secret → 配置到 Worker secrets
3. `wrangler deploy` 部署 Worker 到 cms.whoami.nx.kg
4. 推送博客 admin 文件 → 访问 `https://whoami.nx.kg/admin` 登录

## 验证

- 本地 `pnpm build` 后 `/admin` 静态页可达
- 本地 `wrangler dev` 模拟 /auth /callback 跳转
- 部署后浏览器实测:登录弹窗 → GitHub 授权 → 文章列表 → 编辑/新建 → 保存 commit → Actions 部署
- 图片上传到 `public/images/`(media_folder),文章引用 `/images/...`

## 边界

- 不启用 editorial workflow(PR 模式),保持"保存即推 main"直通
- 不动博客 src/ 代码、不动部署 workflow
- Decap CDN 用 jsdelivr(unpkg 国内可达性已验证两者均可,选 jsdelivr 更稳)
