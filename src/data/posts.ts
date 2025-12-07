import type { Post } from "@/types";

export const postsData: Post[] = [
	{
		id: 1,
		title: "使用 React 和 shadcn/ui 构建现代 UI",
		excerpt:
			"探索如何利用 React 生态中最流行的组件库 shadcn/ui 来快速构建美观且可定制的用户界面。",
		// 新增更详细的内容
		content: `
## 引言

在现代前端开发中，组件库的选择至关重要。它不仅影响开发效率，更决定了最终产品的用户体验和可维护性。近年来，shadcn/ui 作为一个新兴的组件库，凭借其独特的设计理念和实践方式，迅速获得了社区的广泛关注。

## 什么是 shadcn/ui？

shadcn/ui 并不是一个传统的、需要完整安装的组件库。它更像是一个“组件系统”或“工具集”。它的核心思想是：**将组件直接复制到你的项目中**。

这意味着：
- **完全控制**: 你拥有每个组件的源代码，可以随意修改。
- **无依赖锁定**: 没有庞大的依赖包，只引入你需要的组件。
- **基于 Radix UI**: 它在 Radix UI 这样的无样式可访问性 primitives 之上构建，保证了组件的高质量和可访问性。
- **Tailwind CSS 样式**: 样式通过 Tailwind CSS 实现，与你的项目样式系统无缝集成。

## 核心优势

### 1. 可定制性
由于代码就在你的项目中，你可以毫不费力地更改组件的样式、行为或结构，而不必等待库的更新或使用复杂的覆盖方案。

### 2. 性能
按需引入，没有多余的代码。你的最终打包体积只包含你实际使用的组件，这对于性能优化至关重要。

### 3. 学习价值
阅读和修改 shadcn/ui 的组件代码是学习现代 React 和 TypeScript 最佳实践的绝佳方式。代码质量非常高，值得学习。

## 如何开始？

\`\`\`bash
npx shadcn@latest init
npx shadcn@latest add button
\`\`\`

只需几条命令，你就可以将一个高质量的 Button 组件添加到你的项目中，并立即开始使用和修改它。

## 结论

shadcn/ui 代表了一种新的组件库使用范式。它将控制权和灵活性交还给开发者，同时又不牺牲开发效率和组件质量。对于追求高度定制化和性能的现代化项目来说，它无疑是一个值得考虑的优秀选择。
    `,
		author: "张三",
		date: "2025-11-20",
		coverImage:
			"https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&h=400&fit=crop",
		tags: ["React", "shadcn/ui", "前端"],
		featured: true
	},
	{
		id: 2,
		title: "深入理解 TypeScript 高级类型",
		excerpt:
			"本文将带你深入了解 TypeScript 中的泛型、条件类型、映射类型等高级特性，提升你的代码健壮性。",
		content: `
TypeScript 的强大之处远不止于为 JavaScript 添加类型。其高级类型系统是构建大型、可维护应用的关键。

## 泛型

泛型允许我们编写可重用的、灵活的代码。一个函数可以处理多种类型，而不失类型安全。

\`\`\`typescript
function identity<T>(arg: T): T {
    return arg;
}
\`\`\`

## 条件类型

条件类型让类型逻辑变得像 JavaScript 的 if/else 语句。

\`\`\`typescript
type IsString<T> = T extends string ? true : false;
\`\`\`

## 映射类型

映射类型可以遍历一个类型的所有属性，并创建一个新的类型。

\`\`\`typescript
type Readonly<T> = {
    readonly [P in keyof T]: T[P];
};
\`\`\`

掌握这些高级特性，将让你的 TypeScript 功力大增。
    `,
		author: "李四",
		date: "2025-11-15",
		coverImage:
			"https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=800&h=400&fit=crop",
		tags: ["TypeScript", "编程", "技术"],
		featured: false
	},
	{
		id: 3,
		title: "Vite：下一代前端构建工具",
		excerpt:
			"为什么 Vite 比 Webpack 快？本文将从原理出发，剖析 Vite 的优势，并分享一些实用配置技巧。",
		content: "...",
		author: "王五",
		date: "2025-11-10",
		coverImage:
			"https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=800&h=400&fit=crop",
		tags: ["Vite", "构建工具", "性能"],
		featured: true
	},
	{
		id: 4,
		title: "CSS-in-JS 还是 Tailwind CSS？",
		excerpt:
			"对比两种主流的 CSS 方案，分析它们的优缺点，帮助你为下一个项目做出最佳选择。",
		content: "...",
		author: "赵六",
		date: "2025-11-05",
		coverImage:
			"https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=400&fit=crop",
		tags: ["CSS", "Tailwind", "CSS-in-JS"],
		featured: false
	}
];
