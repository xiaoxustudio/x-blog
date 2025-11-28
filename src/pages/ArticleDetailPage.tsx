import { useParams, Link } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Calendar, User } from "lucide-react";
import { postsData } from "@/data/posts";
import "./ArticleDetailPage.css";

function ArticleDetailPage() {
	// useParams 会从 URL 中解析出动态参数，例如 { id: '1' }
	const { id } = useParams<{ id: string }>();

	// 根据 id 查找对应的文章
	const post = postsData.find((p) => p.id === Number(id));

	// 如果找不到文章，显示一个 404 提示
	if (!post) {
		return (
			<div className="container mx-auto px-4 py-12 text-center">
				<h1 className="text-4xl font-bold mb-4">404 - 文章未找到</h1>
				<p className="text-muted-foreground mb-8">
					抱歉，您访问的文章不存在。
				</p>
				<Link to="/articles">
					<Button>返回文章列表</Button>
				</Link>
			</div>
		);
	}

	// 找到文章，渲染详情页
	return (
		<div className="container mx-auto px-4 py-12 max-w-4xl">
			{/* 返回按钮 */}
			<Link to="/articles">
				<Button variant="ghost" className="mb-6">
					<ArrowLeft className="mr-2 h-4 w-4" />
					返回文章列表
				</Button>
			</Link>

			<article>
				{/* 文章头部信息 */}
				<header className="mb-8">
					<h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
						{post.title}
					</h1>
					<div className="flex items-center text-sm text-muted-foreground mb-4">
						<User className="mr-1 h-4 w-4" />
						<span className="mr-4">{post.author}</span>
						<Calendar className="mr-1 h-4 w-4" />
						<span>{post.date}</span>
					</div>
					<div className="flex gap-2 flex-wrap">
						{post.tags.map((tag) => (
							<Badge key={tag} variant="secondary">
								{tag}
							</Badge>
						))}
					</div>
				</header>

				{/* 文章封面图 */}
				<img
					src={post.coverImage}
					alt={post.title}
					className="w-full h-64 md:h-96 object-cover rounded-lg mb-8"
				/>

				{/* 文章正文 */}
				<div className="prose prose-lg max-w-none">
					{/* 使用 react-markdown 渲染 Markdown 内容 */}
					<ReactMarkdown>{post.content}</ReactMarkdown>
				</div>
			</article>
		</div>
	);
}

export default ArticleDetailPage;
