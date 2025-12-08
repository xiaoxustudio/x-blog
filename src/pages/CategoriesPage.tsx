import { useEffect, useMemo } from "react";
import { Link } from "react-router";
import { Badge, Box, Card, Flex } from "@radix-ui/themes";
import GetTags from "@/apis/common/tags";
import GetPosts from "@/apis/common/posts";
import { toast } from "sonner";
import useTagsStore from "@/store/tags";
import usePostsStore from "@/store/posts";

function CategoriesPage() {
	const { setTags, tags } = useTagsStore();
	const { setPosts, posts } = usePostsStore();
	const tagCounts = useMemo(() => {
		const counts: { [key: string]: number } = {};
		posts.forEach((post) => {
			post.tags.split(",").forEach((tag) => {
				counts[tag] = (counts[tag] || 0) + 1;
			});
		});
		return counts;
	}, [posts]);

	const getTagSize = (count: number) => {
		const sizes = [
			"text-sm",
			"text-base",
			"text-lg",
			"text-xl",
			"text-2xl",
			"text-3xl"
		];
		const index = Math.min(count - 1, sizes.length - 1);
		return sizes[index] || sizes[0];
	};

	useEffect(() => {
		GetTags().then(({ data }) => {
			setTags(data.data);
		});
		GetPosts().then(({ data }) => {
			if (~data.code) {
				setPosts(data.data);
			} else {
				toast.error(data.msg);
			}
		});
	}, []); // eslint-disable-line react-hooks/exhaustive-deps

	return (
		<div className="container mx-auto px-4 py-12">
			<div className="mb-12 text-center">
				<h1 className="text-4xl font-bold tracking-tight">文章分类</h1>
				<p className="text-muted-foreground mt-4 text-lg">
					探索不同技术领域的文章，点击分类查看相关内容。
				</p>
			</div>

			<div className="mb-16 flex flex-wrap justify-center gap-4">
				{tags.map((tag) => {
					const count = tagCounts[tag.name] || 0;
					const sizeClass = getTagSize(count);

					return (
						<Link
							key={tag.name}
							to={`/articles?tag=${encodeURIComponent(tag.name)}`}
						>
							<Badge
								color="gray"
								className={`${sizeClass} cursor-pointer px-4 py-2 transition-transform hover:scale-110 ${tag.color} text-white hover:opacity-90`}
							>
								{tag.name} ({count})
							</Badge>
						</Link>
					);
				})}
			</div>

			<div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
				{tags.map((tag) => {
					const count = tagCounts[tag.name] || 0;
					return (
						<Card
							key={tag.name}
							className="transition-shadow hover:shadow-lg"
						>
							<Box>
								<Flex align="center" justify="between">
									<span>{tag.name}</span>
									<Badge variant="outline">
										{count} 篇文章
									</Badge>
								</Flex>
								<Flex>{tag.description}</Flex>
							</Box>
							<Box>
								<Link
									to={`/articles?tag=${encodeURIComponent(tag.name)}`}
									className="text-primary text-sm text-gray-400 hover:underline"
								>
									查看所有 "
									<strong className="text-black/50">
										{tag.name}
									</strong>
									" 文章 →
								</Link>
							</Box>
						</Card>
					);
				})}
			</div>
		</div>
	);
}

export default CategoriesPage;
