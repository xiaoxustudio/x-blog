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
			<Card className="cursor-pointer overflow-hidden transition-shadow hover:shadow-lg">
				<Box className="group relative m-2">
					<img
						src={post.coverImage}
						alt={post.title}
						className="mb-2 h-45 w-full rounded-md object-cover"
					/>
					<Text
						size="4"
						as="div"
						className="absolute bottom-2 rounded-r-md bg-[#00000080] pl-2 text-xl text-white opacity-30 transition-opacity duration-500 group-hover:opacity-100"
					>
						{post.title}
					</Text>
				</Box>
				<Box>
					<Box className="py-2 text-sm">{post.excerpt}</Box>
				</Box>
				<Flex>
					<Flex
						align="center"
						className="text-muted-foreground mr-3 mb-3 text-sm"
					>
						<User className="mr-1 h-4 w-4" />
						<span className="mr-4">{post.author}</span>
						<Calendar className="mr-1 h-4 w-4" />
						<Text>{post.date}</Text>
					</Flex>
					<Flex wrap="wrap" gap="2">
						{post.tags.slice(0, 3).map((tag) => (
							<Badge key={tag} color="gray">
								{tag}
							</Badge>
						))}
					</Flex>
				</Flex>
			</Card>
		</Link>
	);
}
