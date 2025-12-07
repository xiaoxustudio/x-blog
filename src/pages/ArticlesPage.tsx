import { useState, useMemo, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { PostCard } from "@/components/PostCard";
import { postsData, tagsData } from "@/data/posts";
import { Button } from "@/components/Button";

const allTags = tagsData.map((t) => t.name);

function ArticlesPage() {
	const [searchParams, setSearchParams] = useSearchParams();
	const initialTag = searchParams.get("tag");
	const [selectedTag, setSelectedTag] = useState<string | null>(initialTag);

	useEffect(() => {
		setSelectedTag(initialTag);
	}, [initialTag]);

	const filteredPosts = useMemo(() => {
		if (!selectedTag) {
			return postsData;
		}
		return postsData.filter((post) => post.tags.includes(selectedTag));
	}, [selectedTag]);

	const handleTagClick = (tag: string | null) => {
		setSelectedTag(tag);
		if (tag) {
			setSearchParams({ tag });
		} else {
			setSearchParams({});
		}
	};

	return (
		<div className="container mx-auto px-4 py-12">
			<h1 className="text-4xl font-bold tracking-tight mb-2">所有文章</h1>
			{selectedTag && (
				<p className="text-muted-foreground mb-8">
					当前筛选:{" "}
					<span className="text-primary font-semibold">
						{selectedTag}
					</span>
				</p>
			)}

			<div className="mb-8 flex flex-wrap gap-2">
				<Button onClick={() => handleTagClick(null)}>全部</Button>
				{allTags.map((tag) => (
					<Button key={tag} onClick={() => handleTagClick(tag)}>
						{tag}
					</Button>
				))}
			</div>

			{filteredPosts.length > 0 ? (
				<div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
					{filteredPosts.map((post) => (
						<PostCard key={post.id} post={post} />
					))}
				</div>
			) : (
				<p className="text-center text-muted-foreground text-lg">
					没有找到关于 "{selectedTag}" 的文章。
				</p>
			)}
		</div>
	);
}

export default ArticlesPage;
