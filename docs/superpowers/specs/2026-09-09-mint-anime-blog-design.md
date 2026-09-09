# 韩子阳的博客设计说明

## 目标

从空目录搭建一个中文个人博客，使用 VuePress 2 和 vuepress-theme-hope，部署目标为 GitHub Pages 仓库 `dfghjyu/blog`，生产路径为 `/blog/`。

## 视觉与内容

- 主色为深青 `#0d5960`、薄荷绿 `#79d9c5`、浅青背景 `#eefaf8`、正文墨色 `#17363a`，深色模式切换为深海青背景。
- 首页采用“安静工作台”叙事：头像/角色占位、博客宣言、最新文章卡片、分类和标签入口。
- 角色是原创的银灰发、冷静气质、抱吉他的二次元 SVG 占位，不复制任何现有角色的独特外观。
- 文案中文，站点名称“韩子阳的博客”，描述“记录技术、学习与生活”。

## 信息架构

- `/`：自定义首页。
- `/posts/`：文章索引。
- `/posts/hello-vuepress/`：示例文章，演示 Markdown、代码块和标签。
- `/category/`：分类入口。
- `/tag/`：标签入口。
- `/about/`：关于页面。
- 主题提供搜索、深色模式、目录、返回顶部和 GitHub 链接。

## 工程方案

- `docs/.vuepress/config.ts` 负责 VuePress 配置、`/blog/` base、导航、侧边栏、主题选项和 Markdown 扩展。
- `docs/.vuepress/styles/index.scss` 负责站点 token、首页布局、卡片、角色面板和响应式细节。
- `docs/.vuepress/public/` 放 favicon 和头像 SVG。
- `package.json` 使用 pnpm 脚本；`.github/workflows/deploy.yml` 使用官方 Pages artifact/action 在 `main` push 时构建和部署。
- Node.js 22 通过 workflow 的 `setup-node` 与 `engines` 约束；仓库根目录提供 `pnpm-workspace.yaml` 和 `README.md`。

## 验收标准

1. `pnpm install` 成功。
2. `pnpm docs:build` 成功，并生成 `docs/.vuepress/dist/`。
3. 所有导航目标存在，base 为 `/blog/`。
4. 工作流仅在 `main` push 或手动触发时部署，拥有 Pages 所需权限。
5. 移动端可读，键盘焦点可见，尊重 `prefers-reduced-motion`。
