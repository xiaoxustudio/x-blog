import { useMemo } from "react";
import { Link } from "react-router-dom";
import { postsData, tagsData } from "@/data/posts";
import { Badge } from "@/components/ui/badge";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle
} from "@/components/ui/card";

function CategoriesPage() {
	const tagCounts = useMemo(() => {
		const counts: { [key: string]: number } = {};
		postsData.forEach((post) => {
			post.tags.forEach((tag) => {
				counts[tag] = (counts[tag] || 0) + 1;
			});
		});
		return counts;
	}, []);

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

	return (
		<div className="container mx-auto px-4 py-12">
			<div className="text-center mb-12">
				<h1 className="text-4xl font-bold tracking-tight">文章分类</h1>
				<p className="mt-4 text-lg text-muted-foreground">
					探索不同技术领域的文章，点击分类查看相关内容。
				</p>
			</div>

			<div className="flex flex-wrap justify-center gap-4 mb-16">
				{tagsData.map((tag) => {
					const count = tagCounts[tag.name] || 0;
					const sizeClass = getTagSize(count);

					return (
						<Link
							key={tag.name}
							to={`/articles?tag=${encodeURIComponent(tag.name)}`}
						>
							<Badge
								variant="secondary"
								className={`${sizeClass} px-4 py-2 cursor-pointer transition-transform hover:scale-110 ${tag.color} text-white hover:opacity-90`}
							>
								{tag.name} ({count})
							</Badge>
						</Link>
					);
				})}
			</div>

			<div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
				{tagsData.map((tag) => {
					const count = tagCounts[tag.name] || 0;
					return (
						<Card
							key={tag.name}
							className="transition-shadow hover:shadow-lg"
						>
							<CardHeader>
								<CardTitle className="flex items-center justify-between">
									<span>{tag.name}</span>
									<Badge variant="outline">
										{count} 篇文章
									</Badge>
								</CardTitle>
								<CardDescription>
									{tag.description}
								</CardDescription>
							</CardHeader>
							<CardContent>
								<Link
									to={`/articles?tag=${encodeURIComponent(tag.name)}`}
									className="text-sm text-primary hover:underline"
								>
									查看所有 "{tag.name}" 文章 →
								</Link>
							</CardContent>
						</Card>
					);
				})}
			</div>
		</div>
	);
}

export default CategoriesPage;
