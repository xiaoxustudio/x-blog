import { useParams, Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Calendar, User } from "lucide-react";
import { postsData } from "@/data/posts";
import Editor from "@/components/Editor";

function ArticleDetailPage() {
	const { id } = useParams<{ id: string }>();

	const post = postsData.find((p) => p.id === Number(id));

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

	return (
		<div className="container mx-auto px-4 py-12 max-w-4xl">
			<Link to="/articles">
				<Button variant="ghost" className="mb-6">
					<ArrowLeft className="mr-2 h-4 w-4" />
					返回文章列表
				</Button>
			</Link>

			<article>
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

				<img
					src={post.coverImage}
					alt={post.title}
					className="w-full h-64 md:h-96 object-cover rounded-lg mb-8"
				/>

				<div className="prose prose-lg max-w-none">
					<Editor value={post.content} readonly={true}></Editor>
				</div>
			</article>
		</div>
	);
}

export default ArticleDetailPage;
