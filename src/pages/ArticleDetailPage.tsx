import { useParams, useNavigate } from "react-router";
import { ArrowLeft, Calendar, User } from "lucide-react";
import Editor from "@/components/Editor";
import { Button } from "@/components/Button";
import { Badge, Box } from "@radix-ui/themes";
import { useEffect } from "react";
import GetPosts from "@/apis/common/posts";
import { toast } from "sonner";
import usePostsStore from "@/store/posts";

function ArticleDetailPage() {
	const { id } = useParams<{ id: string }>();
	const navigate = useNavigate();
	const { setPosts, posts } = usePostsStore();

	const post = posts.find((p) => p.id === Number(id));

	useEffect(() => {
		GetPosts().then(({ data }) => {
			if (~data.code) {
				setPosts(data.data);
			} else {
				toast.error(data.msg);
			}
		});
	}, []); // eslint-disable-line react-hooks/exhaustive-deps

	if (!post) {
		return (
			<div className="container mx-auto px-4 py-12 text-center">
				<h1 className="mb-4 text-4xl font-bold">404 - 文章未找到</h1>
				<p className="text-muted-foreground mb-8">
					抱歉，您访问的文章不存在。
				</p>
				<Button mode="clear" onClick={() => navigate(-1)}>
					返回文章列表
				</Button>
			</div>
		);
	}

	return (
		<div className="container mx-auto max-w-4xl px-4 py-12">
			<Box className="sticky top-25 z-50 -ml-40 block">
				<Button
					mode="clear"
					className="mb-6"
					onClick={() => navigate(-1)}
				>
					<ArrowLeft className="mr-2 h-4 w-4" />
					返回文章列表
				</Button>
			</Box>

			<article>
				<header className="mb-8">
					<h1 className="mb-4 text-4xl font-bold tracking-tight md:text-5xl">
						{post.title}
					</h1>
					<div className="text-muted-foreground mb-4 flex items-center text-sm">
						<User className="mr-1 h-4 w-4" />
						<span className="mr-4">{post.author}</span>
						<Calendar className="mr-1 h-4 w-4" />
						<span>{post.date}</span>
					</div>
					<div className="flex flex-wrap gap-2">
						{post.tags.split(",").map((tag) => (
							<Badge key={tag} color="gray">
								{tag}
							</Badge>
						))}
					</div>
				</header>

				<img
					src={post.coverImage}
					alt={post.title}
					className="mb-8 h-64 w-full rounded-lg object-cover md:h-96"
				/>

				<div className="prose prose-lg max-w-none">
					<Editor value={post.content} readonly={true}></Editor>
				</div>
			</article>
		</div>
	);
}

export default ArticleDetailPage;
