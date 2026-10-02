/**
 * 统一解析媒体资源路径与链接：
 * 1. 外部链接 (http://, https://, //, data:)：原样返回
 * 2. 移除多余的 public/ 前缀（如 Decap CMS 填入 public/images/xxx 规范为 /images/xxx）
 * 3. 相对路径自动补全前导斜杠 /
 */
export function resolveMediaUrl(url?: string | null): string {
	if (!url) return "";
	const trimmed = url.trim();
	if (!trimmed) return "";

	// 外部链接、协议相对 URL 或 base64 Data URL
	if (/^(https?:)?\/\//i.test(trimmed) || /^data:/i.test(trimmed)) {
		return trimmed;
	}

	// 移除 public/ 或 /public/ 前缀
	const withoutPublic = trimmed.replace(/^\/?public\//, "/");
	return withoutPublic.startsWith("/") ? withoutPublic : `/${withoutPublic}`;
}
