---
title: "写文章指南"
description: "本文介绍如何在博客中新建文章，包括 Front Matter 设置和 Markdown 语法。"
date: 2026-05-31
tags:
- Hugo
- 博客
categories:
- 技术
draft: false
image: false
math: false
---

# 写文章指南

## 快速开始

新建 Markdown 文件放在 `content/post/` 目录下，文件名任意（建议英文小写），然后编辑 Front Matter 和正文即可。

---

## Front Matter

文章开头用 `---` 包裹的基本参数：

```yaml
---
title: "文章标题"
description: "文章简介，显示在卡片副标题和SEO"
date: 2026-05-31
tags:
  - Hugo
  - 博客
categories:
  - 技术
draft: false
---
```

## 所有可用参数

| 参数 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `title` | string | — | 文章标题 |
| `description` | string | — | 文章简介 |
| `date` | date | 文件修改时间 | 发布日期 |
| `tags` | array | `[]` | 标签列表 |
| `categories` | array | `[]` | 分类列表 |
| `draft` | bool | `false` | 为 `true` 时不发布 |
| `image` | string | — | 文章头图路径（相对 `static/`） |
| `math` | bool | `false` | 是否启用数学公式渲染 |
| `ai` | bool | `true` | 是否启用 AI 摘要终端 |

## AI 设置

默认情况下，文章会自动加载 AI 摘要终端。如果你希望某篇文排斥禁用 AI：

```yaml
---
title: "纯手动文章"
ai: false
---
```

## Markdown 语法

### 标题

```markdown
# 一级标题
## 二级标题
### 三级标题
```

### 文本样式

```markdown
**粗体** *斜体* ~~删除线~~ `行内代码`
```

### 列表

```markdown
- 无序列表项 1
- 无序列表项 2

1. 有序列表项 1
2. 有序列表项 2
```

### 引用

```markdown
> 这是一个引用块
> 可以跨越多行
```

### 代码块

````markdown
```go
func main() {
    fmt.Println("Hello!")
}
```
````

### 表格

```markdown
| 列1 | 列2 |
|-----|-----|
| 值1 | 值2 |
| 值3 | 值4 |
```

### 图片

```markdown
![描述文字](/images/example.jpg)
```

---

## 文件结构示例

```
content/
└── post/
    ├── hello-world.md
    ├── my-second-post.md
    └── ...
```

## 撰写流程

1. 在 `content/post/` 下新建 `.md` 文件
2. 填写 Front Matter（参考上文）
3. 在 `---` 下方写正文
4. 本地预览：`hugo server --buildDrafts`
5. 推送到 `master` 分支自动部署
