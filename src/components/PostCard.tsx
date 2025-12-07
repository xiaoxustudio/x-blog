import type { Post } from "@/types";
import { Badge, Box, Card, Flex, Text } from "@radix-ui/themes";
import { Calendar, User } from "lucide-react";
import { Link } from "react-router-dom";

interface PostCardProps {
	post: Post;
}

export function PostCard({ post }: PostCardProps) {
	return (
		<Link to={`/articles/${post.id}`}>
			<Card className="overflow-hidden transition-shadow hover:shadow-lg cursor-pointer">
				<Box className="relative m-2 group">
					<img
						src={post.coverImage}
						alt={post.title}
						className="w-full h-45 object-cover rounded-md mb-2"
					/>
					<Text
						size="4"
						as="div"
						className=" pl-2 opacity-30 transition-opacity duration-500 group-hover:opacity-100 text-xl absolute bottom-2 text-white bg-[#00000080] rounded-r-md"
					>
						{post.title}
					</Text>
				</Box>
				<Box>
					<Box className="text-sm py-2">{post.excerpt}</Box>
				</Box>
				<Flex>
					<div className="flex items-center text-sm text-muted-foreground mb-3 mr-3">
						<User className="mr-1 h-4 w-4" />
						<span className="mr-4">{post.author}</span>
						<Calendar className="mr-1 h-4 w-4" />
						<Text>{post.date}</Text>
					</div>
					<div className="flex gap-2 flex-wrap">
						{post.tags.slice(0, 3).map((tag) => (
							<Badge key={tag} color="gray">
								{tag}
							</Badge>
						))}
					</div>
				</Flex>
			</Card>
		</Link>
	);
}
