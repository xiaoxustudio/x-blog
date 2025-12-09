import { useEffect, useState } from "react";
import GetPublishPosts from "@/apis/user/publish_posts";
import type { Post, RepsonseData } from "@/types";
import { toast } from "sonner";
import { Badge, Flex, Grid, Heading, Text } from "@radix-ui/themes";
import { PostCard } from "@/components/PostCard";

function MyArticles() {
	const [postsData, setPostsData] = useState<Post[]>([]);
	const updatePostsData = async () => {
		GetPublishPosts().then(({ data }) => {
			if (~data.code) {
				setPostsData(data.data);
			} else {
				toast.error(data.msg);
			}
		});
	};

	const handleOperate = ({ code, msg }: RepsonseData) => {
		if (~code) {
			toast.success(msg);
		} else {
			toast.error(msg);
		}
		updatePostsData();
	};

	useEffect(() => {
		updatePostsData();
	}, []);

	return (
		<Flex direction="column" gap="5" className="p-5">
			<Heading>我的文章</Heading>
			<Grid columns="3" gap="9">
				{postsData.map((post) => (
					<PostCard
						key={post.id}
						post={post}
						context
						onSuccess={handleOperate}
						onError={handleOperate}
					/>
				))}
			</Grid>
			<Text>
				<Badge>总共：{postsData.length} 篇文章</Badge>
			</Text>
		</Flex>
	);
}
export default MyArticles;
