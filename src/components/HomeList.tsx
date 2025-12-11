import GetPosts from "@/apis/common/posts";
import usePostsStore from "@/store/posts";
import { useMemo, useEffect } from "react";
import { toast } from "sonner";
import { FeaturedPost } from "./FeaturedPost";
import { Hero } from "./Hero";
import { PostCard } from "./PostCard";

function HomeList() {
	const { setPosts, posts } = usePostsStore();
	const featuredPosts = useMemo(
		() => posts.filter((post) => post.featured),
		[posts]
	);
	const regularPosts = useMemo(
		() => posts.filter((post) => !post.featured),
		[posts]
	);

	useEffect(() => {
		GetPosts().then(({ data }) => {
			if (~data.code) {
				setPosts(data.data);
			} else {
				toast.error(data.msg);
			}
		});
	}, []); // eslint-disable-line react-hooks/exhaustive-deps

	return (
		<>
			<Hero />
			<section className="md:py-12">
				<div className="container mx-auto px-4">
					<h2 className="mb-8 text-3xl font-bold tracking-tight">
						精选文章
					</h2>
					<div className="grid gap-8">
						{featuredPosts.slice(0, 3).map((post) => (
							<FeaturedPost key={post.id} post={post} />
						))}
					</div>
				</div>
			</section>

			<section className="bg-muted/50 py-12 md:py-24">
				<div className="container mx-auto px-4">
					<h2 className="mb-8 text-3xl font-bold tracking-tight">
						最新文章
					</h2>
					<div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
						{regularPosts.slice(0, 16).map((post) => (
							<PostCard key={post.id} post={post} />
						))}
					</div>
				</div>
			</section>
		</>
	);
}

export default HomeList;
