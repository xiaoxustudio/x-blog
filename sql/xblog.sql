/*
 Navicat MySQL Data Transfer

 Source Server         : d-mysql
 Source Server Type    : MySQL
 Source Server Version : 90100
 Source Host           : localhost:3306
 Source Schema         : xblog

 Target Server Type    : MySQL
 Target Server Version : 90100
 File Encoding         : 65001

 Date: 14/12/2025 16:12:03
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for comments
-- ----------------------------
DROP TABLE IF EXISTS `comments`;
CREATE TABLE `comments`  (
  `id` int(0) NOT NULL AUTO_INCREMENT COMMENT '评论ID',
  `post_id` int(0) UNSIGNED NOT NULL COMMENT '关联的文章ID',
  `user_id` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '评论用户ID',
  `content` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '评论内容',
  `parent_id` int(0) NOT NULL DEFAULT 0 COMMENT '父评论ID, 0为顶级评论',
  `created_at` datetime(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0) COMMENT '创建时间',
  `updated_at` datetime(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0) ON UPDATE CURRENT_TIMESTAMP(0) COMMENT '更新时间',
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `fk_comments_post_id`(`post_id`) USING BTREE,
  INDEX `fk_comments_user_id`(`user_id`) USING BTREE,
  CONSTRAINT `fk_comments_post_id` FOREIGN KEY (`post_id`) REFERENCES `posts` (`id`) ON DELETE CASCADE ON UPDATE RESTRICT,
  CONSTRAINT `fk_comments_user_id` FOREIGN KEY (`user_id`) REFERENCES `users` (`username`) ON DELETE CASCADE ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 14 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of comments
-- ----------------------------
INSERT INTO `comments` VALUES (1, 1, 'xuran', '123', 0, '2025-12-12 23:39:55', '2025-12-12 23:39:55');
INSERT INTO `comments` VALUES (2, 1, 'xuran', '徐然的秘密', 0, '2025-12-13 00:37:23', '2025-12-13 00:37:23');
INSERT INTO `comments` VALUES (3, 1, 'xuran', '我评论我自己\n哈哈哈哈\n你看看这东西，我\n真的服了', 0, '2025-12-13 01:09:14', '2025-12-13 01:09:14');
INSERT INTO `comments` VALUES (4, 1, 'xuran', '\n我评论我自己\n哈哈哈哈\n你看看这东西，我\n真的服了\n\n我评论我自己\n哈哈哈哈\n你看看这东西，我\n真的服了\n\n我评论我自己\n哈哈哈哈\n你看看这东西，我\n真的服了', 0, '2025-12-13 01:14:26', '2025-12-13 01:14:26');
INSERT INTO `comments` VALUES (5, 1, 'xuran', '测试', 0, '2025-12-13 01:17:51', '2025-12-13 01:17:51');
INSERT INTO `comments` VALUES (6, 1, 'xuran', '徐然nb', 0, '2025-12-13 01:18:36', '2025-12-13 01:18:36');
INSERT INTO `comments` VALUES (7, 2, 'xuran', '测试', 0, '2025-12-13 14:46:39', '2025-12-13 14:46:39');
INSERT INTO `comments` VALUES (8, 1, 'test', '123', 2, '2025-12-13 16:10:51', '2025-12-13 16:10:51');
INSERT INTO `comments` VALUES (9, 1, 'test', '什么徐然的秘密？细说好吧！！！', 2, '2025-12-13 19:14:16', '2025-12-13 19:14:16');
INSERT INTO `comments` VALUES (11, 1, 'test', '什么东西', 4, '2025-12-13 19:27:03', '2025-12-13 19:27:03');
INSERT INTO `comments` VALUES (12, 2, 'test', 'asdasdasd', 7, '2025-12-13 21:04:13', '2025-12-13 21:04:13');
INSERT INTO `comments` VALUES (13, 2, 'test', '我就算说要测试一下嘛HHHHHHH', 0, '2025-12-13 21:09:06', '2025-12-13 21:09:06');
INSERT INTO `comments` VALUES (14, 5, 'test', '123123123', 0, '2025-12-13 21:09:31', '2025-12-13 21:09:31');
INSERT INTO `comments` VALUES (15, 1, 'test', '123徐然', 0, '2025-12-14 14:44:46', '2025-12-14 15:48:54');

-- ----------------------------
-- Table structure for posts
-- ----------------------------
DROP TABLE IF EXISTS `posts`;
CREATE TABLE `posts`  (
  `id` int(0) UNSIGNED NOT NULL AUTO_INCREMENT,
  `title` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '标题',
  `excerpt` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL COMMENT '摘要',
  `content` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT 'markdown 内容',
  `author` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '作者ID (外键)',
  `date` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3) COMMENT '发布时间',
  `cover_image` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL COMMENT 'base64 图片文本',
  `tags` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '标签 (JSON数组)',
  `featured` tinyint(1) NOT NULL DEFAULT 0 COMMENT '是否为推荐文章',
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `idx_featured`(`featured`) USING BTREE,
  INDEX `idx_date`(`date`) USING BTREE,
  INDEX `fk_posts_user_id`(`author`) USING BTREE,
  CONSTRAINT `fk_posts_user_id` FOREIGN KEY (`author`) REFERENCES `users` (`username`) ON DELETE CASCADE ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 20 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of posts
-- ----------------------------
INSERT INTO `posts` VALUES (1, 'asdasd', 'asdasdasdaasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdsd', '<p>asdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasd</p>', 'test', '2025-12-07 21:47:55.066', 'data:image/png;base64,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', 'Vite', 0);
INSERT INTO `posts` VALUES (2, '使用 React 和 shadcn/ui', '探索如何利用 React 生态中最流行的组件库 shadcn/ui 来快速构建美观且可定制的用户界面', '<h2>引言</h2><p>在现代前端开发中，组件库的选择至关重要。它不仅影响开发效率，更决定了最终产品的用户体验和可维护性。近年来，shadcn/ui 作为一个新兴的组件库，凭借其独特的设计理念和实践方式，迅速获得了社区的广泛关注。</p><h2>什么是 shadcn/ui？</h2><p>shadcn/ui 并不是一个传统的、需要完整安装的组件库。它更像是一个“组件系统”或“工具集”。它的核心思想是：<strong>将组件直接复制到你的项目中</strong>。</p><p>这意味着：</p><ul><li><p><strong>完全控制</strong>: 你拥有每个组件的源代码，可以随意修改。</p></li><li><p><strong>无依赖锁定</strong>: 没有庞大的依赖包，只引入你需要的组件。</p></li><li><p><strong>基于 Radix UI</strong>: 它在 Radix UI 这样的无样式可访问性 primitives 之上构建，保证了组件的高质量和可访问性。</p></li><li><p><strong>Tailwind CSS 样式</strong>: 样式通过 Tailwind CSS 实现，与你的项目样式系统无缝集成。</p></li></ul><h2>核心优势</h2><h3>1. 可定制性</h3><p>由于代码就在你的项目中，你可以毫不费力地更改组件的样式、行为或结构，而不必等待库的更新或使用复杂的覆盖方案。</p><h3>2. 性能</h3><p>按需引入，没有多余的代码。你的最终打包体积只包含你实际使用的组件，这对于性能优化至关重要。</p><h3>3. 学习价值</h3><p>阅读和修改 shadcn/ui 的组件代码是学习现代 React 和 TypeScript 最佳实践的绝佳方式。代码质量非常高，值得学习。</p><h2>如何开始？</h2><p>bash\nnpx shadcn@latest init\nnpx shadcn@latest add button\n</p><p>只需几条命令，你就可以将一个高质量的 Button 组件添加到你的项目中，并立即开始使用和修改它。</p><h2>结论</h2><p>shadcn/ui 代表了一种新的组件库使用范式。它将控制权和灵活性交还给开发者，同时又不牺牲开发效率和组件质量。对于追求高度定制化和性能的现代化项目来说，它无疑是一个值得考虑的优秀选择。</p>', 'xuran', '2025-12-07 23:22:59.128', 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&h=400&fit=crop', 'React,shadcn/ui,前端', 1);
INSERT INTO `posts` VALUES (3, '深入理解 TypeScript 高级类型', '本文将带你深入了解 TypeScript 中的泛型、条件类型、映射类型等高级特性，提升你的代码健壮性', '<p>TypeScript 的强大之处远不止于为 JavaScript 添加类型。其高级类型系统是构建大型、可维护应用的关键。</p><h2>泛型</h2><p>泛型允许我们编写可重用的、灵活的代码。一个函数可以处理多种类型，而不失类型安全。</p><p>typescript\nfunction identity<p></p>(arg: T): T {\n    return arg;\n}\n</p><h2>条件类型</h2><p>条件类型让类型逻辑变得像 JavaScript 的 if/else 语句。</p><p>typescript\ntype IsString<p></p> = T extends string ? true : false;\n</p><h2>映射类型</h2><p>映射类型可以遍历一个类型的所有属性，并创建一个新的类型。</p><p>typescript\ntype Readonly<p></p> = {\n    readonly [P in keyof T]: T[P];\n};\n</p><p>掌握这些高级特性，将让你的 TypeScript 功力大增。\n    </p>', 'xuran', '2025-12-07 23:23:45.803', 'https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=800&h=400&fit=crop', 'TypeScript,编程,技术', 1);
INSERT INTO `posts` VALUES (4, 'Vite：下一代前端构建工具', '为什么Vite比 Webpack快？本文将从原理出发，剖析 Vite 的优势，并分享一些实用配置技巧', '<pre><code class=\"language-typescript\">........................</code></pre><p></p>', 'xuran', '2025-12-07 23:24:23.543', 'https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=800&h=400&fit=crop', 'Vite,构建工具,性能', 0);
INSERT INTO `posts` VALUES (5, 'CSS-in-JS 还是 Tailwind CSS？', '对比两种主流的 CSS 方案，分析它们的优缺点，帮助你为下一个项目做出最佳选择。', '<pre><code class=\"language-typescript\">...............</code></pre><p></p>', 'test', '2025-12-07 23:24:51.374', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=400&fit=crop', 'CSS,Tailwind,CSS-in-JS', 0);
INSERT INTO `posts` VALUES (8, '123123123', '123123123123123', '<p>123123123123123</p>', 'xuran', '2025-12-09 23:54:26.699', '123123123', 'Tailwind,CSS-in-JS', 0);
INSERT INTO `posts` VALUES (10, 'Vue 3 Composition API 实战指南', '深入探索 Vue 3 的 Composition API，学习如何用更现代的方式组织组件逻辑，提升代码的可维护性和复用性', '<h2>为什么需要 Composition API？</h2><p>传统的 Options API 在处理复杂组件时，相关逻辑会被分散在不同的选项中，导致代码难以维护。Composition API 通过组合函数的方式，让相关逻辑聚合在一起。</p><h2>核心概念</h2><p>Composition API 的核心是 <code>setup()</code> 函数和响应式 API。通过 <code>ref</code>、<code>reactive</code>、<code>computed</code> 等函数，我们可以更灵活地管理组件状态。</p><h2>实战示例</h2><pre><code>import { ref, computed, onMounted } from \'vue\'\n\nexport default {\n  setup() {\n    const count = ref(0)\n    const doubled = computed(() => count.value * 2)\n    \n    const increment = () => {\n      count.value++\n    }\n    \n    return { count, doubled, increment }\n  }\n}\n</code></pre><h2>优势总结</h2><p>Composition API 不仅提供了更好的逻辑组织方式，还支持更好的 TypeScript 支持，让组件复用变得更加简单。</p>', 'xuran', '2025-12-08 09:15:00.000', 'https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=800&h=400&fit=crop', 'Vue3,Composition API,前端框架', 1);
INSERT INTO `posts` VALUES (11, '微前端架构：从理论到实践', '探讨微前端架构的设计理念、实现方案和最佳实践，帮助大型团队构建可扩展的前端应用体系', '<h2>什么是微前端？</h2><p>微前端是一种架构风格，将大型前端应用拆分成多个小型、独立的应用，每个应用可以独立开发、测试、部署，最终组合成一个完整的应用。</p><h2>核心优势</h2><ul><li><strong>技术栈无关</strong>：不同团队可以使用不同的技术栈</li><li><strong>独立部署</strong>：每个微应用可以独立发布，不影响其他应用</li><li><strong>团队自治</strong>：小团队可以独立负责自己的功能模块</li></ul><h2>实现方案</h2><p>常见的微前端实现方案包括：<br>1. <strong>Single-SPA</strong>：基于路由的应用加载<br>2. <strong>qiankun</strong>：基于 Single-SPA 的增强版<br>3. <strong>Module Federation</strong>：Webpack 5 的原生支持</p><h2>挑战与解决方案</h2><p>微前端也带来了新的挑战，如样式隔离、JS 沙箱、应用间通信等。通过合理的架构设计和技术选型，这些问题都可以得到有效解决。</p>', 'xuran', '2025-12-08 14:30:00.000', 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=400&fit=crop', '微前端,架构设计,前端工程化', 0);
INSERT INTO `posts` VALUES (12, 'CSS Grid 布局完全指南', '全面掌握 CSS Grid 布局系统，从基础概念到高级技巧，让你轻松创建复杂的响应式布局', '<h2>Grid vs Flexbox</h2><p>Flexbox 适合一维布局（行或列），而 Grid 专为二维布局设计。Grid 可以同时控制行和列，是构建复杂布局的强大工具。</p><h2>基础概念</h2><p>Grid 布局的核心概念包括：<br>- <strong>Grid Container</strong>：应用 grid 布局的父元素<br>- <strong>Grid Item</strong>：Grid 容器的直接子元素<br>- <strong>Grid Line</strong>：构成网格结构的分界线<br>- <strong>Grid Track</strong>：两条相邻网格线之间的空间</p><h2>常用属性</h2><pre><code>.container {\n  display: grid;\n  grid-template-columns: repeat(3, 1fr);\n  grid-gap: 20px;\n}\n\n.item {\n  grid-column: span 2;\n  grid-row: 1 / 3;\n}\n</code></pre><h2>实战技巧</h2><p>Grid 可以轻松实现圣杯布局、卡片网格、仪表盘等复杂布局。结合响应式设计，可以创建适配各种设备的完美布局。</p>', 'xuran', '2025-12-08 18:45:00.000', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=400&fit=crop', 'CSS,Grid,布局,响应式设计', 1);
INSERT INTO `posts` VALUES (13, '前端性能优化：从加载到渲染的全方位指南', '深入探讨前端性能优化的各个环节，包括资源加载、渲染优化、代码分割等关键技术点', '<h2>性能优化的重要性</h2><p>页面加载速度直接影响用户体验和转化率。研究表明，加载时间每增加1秒，转化率可能下降7%。性能优化不是可选项，而是必需品。</p><h2>关键性能指标</h2><ul><li><strong>FCP</strong>：首次内容绘制时间</li><li><strong>LCP</strong>：最大内容绘制时间</li><li><strong>FID</strong>：首次输入延迟</li><li><strong>CLS</strong>：累积布局偏移</li></ul><h2>优化策略</h2><h3>1. 资源优化</h3><p>- 图片懒加载和 WebP 格式<br>- CSS 和 JS 压缩合并<br>- 使用 CDN 加速静态资源</p><h3>2. 渲染优化</h3><p>- 减少 DOM 操作<br>- 使用虚拟滚动<br>- 避免强制同步布局</p><h3>3. 代码分割</h3><p>- 路由级别的代码分割<br>- 组件级别的动态导入<br>- 第三方库的按需加载</p><h2>监控与分析</h2><p>使用 Lighthouse、WebPageTest 等工具持续监控性能指标，建立性能预算，确保优化效果。</p>', 'xuran', '2025-12-09 10:20:00.000', 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=400&fit=crop', '性能优化,前端,Web性能', 0);
INSERT INTO `posts` VALUES (14, 'TypeScript 5.0 新特性深度解析', '全面了解 TypeScript 5.0 带来的新特性，包括装饰器、const 类型参数等，提升类型安全性和开发体验', '<h2>装饰器正式支持</h2><p>TypeScript 5.0 正式支持了 ECMAScript 装饰器，这为元编程提供了标准化的方式。装饰器可以用于类、方法、属性等，实现横切关注点的优雅处理。</p><h2>const 类型参数</h2><p>新的 const 类型参数让泛型更加精确。通过在泛型参数前添加 const 修饰符，可以获得更具体的字面量类型推断。</p><h2>其他重要更新</h2><ul><li><strong>枚举改进</strong>：支持联合枚举</li><li><strong>--moduleResolution bundler</strong>：更好的模块解析策略</li><li><strong>多重配置文件</strong>：支持 extends 多个配置文件</li></ul><h2>升级指南</h2><p>升级到 TypeScript 5.0 需要注意一些破坏性变更，建议先在测试环境中验证，逐步迁移现有项目。</p>', 'xuran', '2025-12-09 13:15:00.000', 'https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=800&h=400&fit=crop', 'TypeScript,新特性,类型系统', 1);
INSERT INTO `posts` VALUES (15, '前端安全：XSS 和 CSRF 防护实战', '深入了解常见的前端安全威胁，学习如何有效防范 XSS 和 CSRF 攻击，保护用户数据安全', '<h2>XSS 攻击原理</h2><p>跨站脚本攻击（XSS）通过在网页中注入恶意脚本，窃取用户信息或执行恶意操作。主要分为反射型、存储型和 DOM 型三种。</p><h2>XSS 防护策略</h2><ul><li><strong>输入验证</strong>：对所有用户输入进行严格验证</li><li><strong>输出编码</strong>：在显示用户输入时进行 HTML 编码</li><li><strong>Content Security Policy</strong>：设置 CSP 头部限制脚本执行</li><li><strong>HttpOnly Cookie</strong>：防止 JavaScript 访问敏感 Cookie</li></ul><h2>CSRF 攻击原理</h2><p>跨站请求伪造（CSRF）利用用户的登录状态，在用户不知情的情况下发送恶意请求。</p><h2>CSRF 防护策略</h2><ul><li><strong>CSRF Token</strong>：在请求中添加随机令牌验证</li><li><strong>SameSite Cookie</strong>：设置 Cookie 的 SameSite 属性</li><li><strong>验证 Referer</strong>：检查请求来源</li></ul><h2>安全最佳实践</h2><p>定期进行安全审计，使用安全扫描工具，建立安全开发生命周期（SDL），从设计阶段就考虑安全问题。</p>', 'xuran', '2025-12-09 16:40:00.000', 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&h=400&fit=crop', '安全,XSS,CSRF,前端安全', 0);
INSERT INTO `posts` VALUES (16, 'PWA 开发实战：构建类原生应用体验', '学习如何使用 Progressive Web App 技术，为 Web 应用添加离线支持、推送通知等原生应用特性', '<h2>什么是 PWA？</h2><p>Progressive Web App 是一种 Web 应用开发理念，通过现代 Web 技术提供类似原生应用的用户体验。PWA 具有可靠、快速、可安装等特点。</p><h2>核心技术栈</h2><ul><li><strong>Service Worker</strong>：实现离线缓存和后台同步</li><li><strong>Web App Manifest</strong>：定义应用元数据和安装配置</li><li><strong>HTTPS</strong>：安全连接的必需条件</li></ul><h2>开发步骤</h2><h3>1. 注册 Service Worker</h3><pre><code>if (\'serviceWorker\' in navigator) {\n  navigator.serviceWorker.register(\'/sw.js\')\n    .then(registration => {\n      console.log(\'SW registered\');\n    });\n}\n</code></pre><h3>2. 创建缓存策略</h3><p>实现不同的缓存策略：缓存优先、网络优先、缓存与网络竞赛等。</p><h3>3. 添加 Manifest</h3><p>创建 manifest.json 文件，定义应用名称、图标、主题色等信息。</p><h2>优势与挑战</h2><p>PWA 提供了更好的用户体验，但也面临浏览器兼容性、开发复杂度等挑战。合理评估项目需求，选择合适的 PWA 特性。</p>', 'xuran', '2025-12-09 20:10:00.000', 'https://images.unsplash.com/photo-1551650975-87deedd944c3?w=800&h=400&fit=crop', 'PWA,Service Worker,移动端', 1);
INSERT INTO `posts` VALUES (17, '前端工程化：从零搭建现代化开发环境', '学习如何从零开始搭建一套完整的前端工程化体系，包括代码规范、自动化构建、持续集成等', '<h2>为什么需要工程化？</h2><p>随着前端应用规模的增长，手工管理变得越来越困难。工程化通过工具和流程的标准化，提高开发效率、代码质量和团队协作效率。</p><h2>核心组成部分</h2><h3>1. 代码规范</h3><ul><li>ESLint + Prettier：代码风格统一</li><li>Stylelint：CSS 代码规范</li><li>Commitlint：提交信息规范</li></ul><h3>2. 构建工具</h3><ul><li>Webpack/Vite：模块打包</li><li>Babel：JavaScript 转译</li><li>PostCSS：CSS 处理</li></ul><h3>3. 自动化流程</h3><ul><li>Husky：Git hooks 管理</li><li>lint-staged：暂存文件检查</li><li>GitHub Actions：CI/CD 流程</li></ul><h2>实践步骤</h2><ol><li>初始化项目结构和配置文件</li><li>配置代码规范和格式化工具</li><li>设置构建和开发服务器</li><li>集成测试和质量检查</li><li>配置自动化部署流程</li></ol><h2>最佳实践</h2><p>建立统一的项目模板，使用 monorepo 管理多包项目，定期更新依赖，保持工具链的现代化。</p>', 'xuran', '2025-12-10 08:30:00.000', 'https://images.unsplash.com/photo-1556075798-4825dfaaf498?w=800&h=400&fit=crop', '工程化,构建工具,自动化', 0);
INSERT INTO `posts` VALUES (18, 'React Hooks 深度解析与最佳实践', '全面掌握 React Hooks 的使用技巧，了解常见陷阱和解决方案，写出更优雅的函数式组件', '<h2>Hooks 的革命性意义</h2><p>React Hooks 彻底改变了我们编写 React 组件的方式。它让函数组件拥有了状态管理和生命周期等能力，同时解决了类组件的诸多问题。</p><h2>核心 Hooks</h2><h3>useState</h3><p>最基础的状态管理 Hook，让函数组件可以拥有状态。</p><h3>useEffect</h3><p>处理副作用，替代类组件的生命周期方法。</p><h3>useContext</h3><p>在组件树中传递数据，避免 prop drilling。</p><h2>自定义 Hooks</h2><p>自定义 Hooks 是 Hooks 的精髓，它让我们能够提取组件逻辑，实现代码复用。</p><pre><code>function useCounter(initialValue = 0) {\n  const [count, setCount] = useState(initialValue);\n  \n  const increment = useCallback(() => {\n    setCount(c => c + 1);\n  }, []);\n  \n  return { count, increment };\n}\n</code></pre><h2>最佳实践</h2><ul><li>只在顶层调用 Hooks</li><li>只在 React 函数中调用 Hooks</li><li>使用 ESLint 插件检查规则</li><li>合理使用 useCallback 和 useMemo</li></ul><h2>常见陷阱</h2><p>闭包陷阱、无限循环、依赖数组错误等是使用 Hooks 时的常见问题，需要特别注意。</p>', 'xuran', '2025-12-10 11:45:00.000', 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&h=400&fit=crop', 'React,Hooks,函数式组件', 1);
INSERT INTO `posts` VALUES (19, '前端监控与错误追踪：构建可靠的监控系统', '学习如何搭建前端监控系统，实时捕获和分析用户行为、性能指标和错误信息，提升应用稳定性', '<h2>为什么需要前端监控？</h2><p>前端应用运行在用户的浏览器中，环境复杂多变。没有有效的监控，我们很难及时发现和解决问题，影响用户体验。</p><h2>监控维度</h2><h3>1. 性能监控</h3><ul><li>页面加载时间</li><li>资源加载情况</li><li>用户交互响应时间</li></ul><h3>2. 错误监控</h3><ul><li>JavaScript 运行时错误</li><li>资源加载失败</li><li>Promise 异常</li></ul><h3>3. 用户行为</h3><ul><li>页面访问统计</li><li>用户操作路径</li><li>功能使用情况</li></ul><h2>技术实现</h2><h3>错误捕获</h3><pre><code>window.addEventListener(\'error\', (event) => {\n  // 发送错误信息到监控服务\n  reportError({\n    message: event.message,\n    filename: event.filename,\n    lineno: event.lineno,\n    colno: event.colno\n  });\n});\n</code></pre><h3>性能数据收集</h3><p>使用 Performance API 收集性能指标，结合 Navigation Timing 获取详细的加载信息。</p><h2>监控平台选择</h2><ul><li>Sentry：专业的错误追踪平台</li><li>Google Analytics：用户行为分析</li><li>自建监控：完全定制化的解决方案</li></ul><h2>告警与分析</h2><p>设置合理的告警阈值，建立错误分级机制，定期分析监控数据，持续优化应用性能。</p>', 'xuran', '2025-12-10 15:20:00.000', 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&h=400&fit=crop', '监控,错误追踪,性能分析', 0);

-- ----------------------------
-- Table structure for tags
-- ----------------------------
DROP TABLE IF EXISTS `tags`;
CREATE TABLE `tags`  (
  `id` int(0) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '主键ID',
  `name` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '分类名称',
  `description` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '分类描述',
  `color` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '颜色标识，例如Tailwind CSS类名',
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `uk_name`(`name`) USING BTREE COMMENT '分类名称应唯一'
) ENGINE = InnoDB AUTO_INCREMENT = 13 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of tags
-- ----------------------------
INSERT INTO `tags` VALUES (1, 'React', '用于构建用户界面的 JavaScript 库', 'bg-blue-500');
INSERT INTO `tags` VALUES (2, 'shadcn/ui', '使用 Radix UI 和 Tailwind CSS 构建的组件库', 'bg-purple-500');
INSERT INTO `tags` VALUES (3, '前端', '所有与客户端开发相关的内容', 'bg-green-500');
INSERT INTO `tags` VALUES (4, 'TypeScript', 'JavaScript 的超集，添加了静态类型', 'bg-blue-600');
INSERT INTO `tags` VALUES (5, '编程', '通用的编程思想和技巧', 'bg-orange-500');
INSERT INTO `tags` VALUES (6, '技术', '广泛的科技领域探讨', 'bg-pink-500');
INSERT INTO `tags` VALUES (7, 'Vite', '下一代前端构建工具', 'bg-indigo-500');
INSERT INTO `tags` VALUES (8, '构建工具', '用于打包和优化代码的工具', 'bg-yellow-500');
INSERT INTO `tags` VALUES (9, '性能', 'Web 应用性能优化', 'bg-red-500');
INSERT INTO `tags` VALUES (10, 'CSS', '层叠样式表，用于网页样式设计', 'bg-cyan-500');
INSERT INTO `tags` VALUES (11, 'Tailwind', '实用优先的 CSS 框架', 'bg-teal-500');
INSERT INTO `tags` VALUES (12, 'CSS-in-JS', '使用 JavaScript 编写 CSS 的方法', 'bg-lime-500');

-- ----------------------------
-- Table structure for users
-- ----------------------------
DROP TABLE IF EXISTS `users`;
CREATE TABLE `users`  (
  `id` int(0) NOT NULL AUTO_INCREMENT,
  `username` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `email` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `password` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `nickname` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `avatar` varchar(2048) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `createdAt` timestamp(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
  PRIMARY KEY (`id`, `username`) USING BTREE,
  UNIQUE INDEX `email`(`email`) USING BTREE,
  UNIQUE INDEX `nickname`(`nickname`) USING BTREE,
  UNIQUE INDEX `username`(`username`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 4 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of users
-- ----------------------------
INSERT INTO `users` VALUES (2, 'xuran', '12123123@qq.com', '4297f44b13955235245b2497399d7a93', '1234', 'data:image/avif;base64,AAAAHGZ0eXBhdmlmAAAAAGF2aWZtaWYxbWlhZgAAAOptZXRhAAAAAAAAACFoZGxyAAAAAAAAAABwaWN0AAAAAAAAAAAAAAAAAAAAAA5waXRtAAAAAAABAAAAImlsb2MAAAAAREAAAQABAAAAAAEOAAEAAAAAAAAD0wAAACNpaW5mAAAAAAABAAAAFWluZmUCAAAAAAEAAGF2MDEAAAAAamlwcnAAAABLaXBjbwAAABNjb2xybmNseAACAAIABoAAAAAMYXYxQ4EADAAAAAAUaXNwZQAAAAAAAADLAAAAhwAAABBwaXhpAAAAAAMICAgAAAAXaXBtYQAAAAAAAAABAAEEgYIDhAAAA9ttZGF0EgAKBxgd8qGYEIAyxQcSEALLLLFAwvxIqp2YryJCchM6d6LL+UVLHCMLxisuWvr0/FHQO5yAbYrEPfw8wm4rqPpky7cwGjik0V+8nPKscO8Rr5+Pki7uOddsePobDW4+YmRA/OLDdYsSuhRmD4b/H6gq5Xr/ICNaa+SGECILga0SeHRc9gF4J0SQVUN3BNiNCGjIHHzoCYie6HzYhr7o/LVLbLe73klPzNdPyhRq9fnwLuTAKHSTc4+b8o8WF5YoxSCqDiQYcGNbUAJLnkIMPDCzUSUjypuRasf9FYdCjXETx8X9K7l+esLAMBiz6bamgK6QiFrp4CSvYjAnMDkctQ/m3Db4f/zgMNO4WD1JkwbZiU9WyZXP9dGoursuTDIdrqN0l8gJCsM4/9AQ3yJWTC40r3Np4dMvqMi+af0NbU6TNkWVUTrDMKDfQbQRVa9TJKEMo94GzSK1+CakJg4XFoXY3UbbCGLpwomMHKHww0LHKINi8DbNtmX1KouSmXuDYRoSmpN/dbOmmbGuCeO6jgD3H2foMJbW2hBPwFa6sLXz2d6FfU7Ns5cVuoERPlVejA0tCd5q9JZ6pufEny3qY45p9oguYAKB+ZuPoznOmobMSyoa/23/U1W56IB4KW/norljGt9RmynWpdqKvV0f3MfQvRifI3CRQ5hJKm7b2nWy2IxLIIHSi1I0bTRzc0P7xB1k+jA8of4yEaBBh75sJ+aAHLPunNt5MLFKqHTfnic08CIfXZabOiqfw6eWgoy4xFBVV1Z+3rkBE3vcgpPYNemuYa5PWOdxQIgkdxnDzDexL4s/pTFdJze/UXf/gULUcZg/H1erCGiFdLEmrKAwvcAYOoV0qGk+pwFSQKlAbKQPtu10tDmMggemSNBzRrDMljbI9vvzJAYPVV9cmO9jzB6FdrHJ0gUMzZ2cbi9QBSTMd7oFVNbp8P6ywJUez9eBR/vhHIRNrMq2XeAFZ4BZn7cf1wPyd10u71dzj6QaFrTQEFn82PgIxNYlAEMYWlPO/i2z03wsCvAwl4yykiZ0iEKeBNqKuelNE5YMmtOOffPWTGgt1gJFNmQfwU+0u/3bLvd55qFv9GyVlEYqDjDWyiXjmgBgrScjMswqJp7vifdquvnW7kLfapygV0wOa6WPKOx+pzK0TIzucM1Eyc3xH8K/asrf3q5Y38fBsJB38lfxTlPlseLvkM3TQzyeGXoqbNNR3rhYVucCBDuGHqQ5jgQJD3usTbZyfbHhFGEGHawm8kwpBaR4z2T6cHvKnugyVDFSfE7gR42G4Pw5rqpyu4UPDg==', '2025-11-30 23:14:39');
INSERT INTO `users` VALUES (3, 'test', '123@qq.com', '4297f44b13955235245b2497399d7a93', '', '', '2025-12-08 15:28:54');

SET FOREIGN_KEY_CHECKS = 1;
