// 兼容层：从 site.config.ts 导出统一配置（请修改 site.config.ts 自定义站点）
import { site, nav, social, comments } from "./site.config";

export const SITE = site;
export const NAV_LINKS = nav;
export const SOCIAL_LINKS = social;
export const COMMENTS = comments;
export const AVATAR = site.avatar;
