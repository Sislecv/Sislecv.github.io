import { setTheme } from "mdui";

export function isDark(): boolean {
	if (typeof document === "undefined") return false;
	const html = document.documentElement;
	if (html.classList.contains("mdui-theme-dark")) return true;
	if (html.classList.contains("mdui-theme-light")) return false;
	return window.matchMedia("(prefers-color-scheme: dark)").matches;
}

export function setAppTheme(theme: "light" | "dark") {
	if (typeof document === "undefined") return;
	const html = document.documentElement;
	// Completely clear all theme classes to prevent auto mode conflicts
	html.classList.remove("mdui-theme-light", "mdui-theme-dark", "mdui-theme-auto");
	html.classList.add(theme === "dark" ? "mdui-theme-dark" : "mdui-theme-light");

	try {
		setTheme(theme);
		localStorage.setItem("theme", theme);
	} catch {
		/* ignore */
	}

	// Broadcast globally to keep all switches and buttons synchronized
	window.dispatchEvent(
		new CustomEvent("app:theme-changed", {
			detail: { theme, isDark: theme === "dark" },
		})
	);
}
