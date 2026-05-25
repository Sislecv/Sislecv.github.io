# AGENTS.md

## Quick Reference

- **Framework**: Hugo 0.161.1 (extended)
- **Theme**: hugo-theme-stack (submodule)
- **Deploy**: GitHub Actions to GitHub Pages on `master` branch

## Essential Commands

```bash
# Build locally (drafts enabled)
hugo server --buildDrafts

# Build for production (no drafts)
hugo --gc --minify

# Clear public directory before build
rm -rf public/*
```

## Development

- Config: `config.yaml` (YAML format)
- Content: `content/` (markdown files, use front matter)
- Theme: `themes/hugo-theme-stack/` (git submodule)
- Port: http://localhost:1313

## Deployment

- Push to `master` triggers GitHub Actions workflow
- Build runs in `ubuntu-latest` with `HUGO_VERSION: 0.161.1`
- Output: `./public` → GitHub Pages

## Content Structure

```
content/
├── post/     # Blog posts (created manually)
└── page/     # Static pages
```

## Theme Notes

- Theme Stack requires preserving "Theme Stack designed by Jimmy" credit
- License: GPL v3.0
- Docs: https://stack.cai.im (EN), https://stack.cai.im/zh (CN)

## Submodules

Update theme submodule if needed:
```bash
git submodule update --remote --merge
```