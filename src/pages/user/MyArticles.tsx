import { useEffect, useState } from "react";
import GetPublishPosts from "@/apis/user/publish_posts";
import type { Post } from "@/types";
import { toast } from "sonner";
import { Badge, Flex, Heading, Text } from "@radix-ui/themes";
import { PostCard } from "@/components/PostCard";

function MyArticles() {
	const [postsData, setPostsData] = useState<Post[]>([]);

	useEffect(() => {
		GetPublishPosts().then(({ data }) => {
			if (~data.code) {
				setPostsData(data.data);
			} else {
				toast.error(data.msg);
			}
		});
	}, []);

	return (
		<Flex direction="column" gap="5" className="p-5">
			<Heading>我的文章</Heading>
			<Flex gap="9">
				{postsData.map((post) => (
					<PostCard key={post.id} post={post} />
				))}
			</Flex>
			<Text>
				<Badge>总共：{postsData.length} 篇文章</Badge>
			</Text>
		</Flex>
	);
}
export default MyArticles;
