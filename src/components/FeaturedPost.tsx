import type { Post } from "@/types";
import { Badge, Box, Card, Flex } from "@radix-ui/themes";
import { Calendar, User } from "lucide-react";
import { Link } from "react-router-dom";

interface FeaturedPostProps {
	post: Post;
}

export function FeaturedPost({ post }: FeaturedPostProps) {
	return (
		<Link to={`/articles/${post.id}`}>
			<Card className="overflow-hidden hover:shadow-lg transition-shadow ">
				<div className="md:flex">
					<div className="md:w-1/2">
						<img
							src={post.coverImage}
							alt={post.title}
							className="h-64 w-full object-cover md:h-full rounded-md"
						/>
					</div>
					<div className="p-6 md:w-1/2 flex flex-col justify-between">
						<Box>
							<Badge className="mb-2">精选</Badge>
							<Box className="p-0">
								<Flex className="text-2xl">{post.title}</Flex>
								<Flex className="text-base mt-2">
									{post.excerpt}
								</Flex>
							</Box>
						</Box>
						<Flex className="p-0 mt-4 items-center gap-2">
							<Flex className="items-center text-sm text-muted-foreground">
								<User className="mr-1 h-4 w-4" />
								<span className="mr-4">{post.author}</span>
								<Calendar className="mr-1 h-4 w-4" />
								<span>{post.date}</span>
							</Flex>
							<Flex className="gap-2">
								{post.tags.slice(0, 3).map((tag) => (
									<Badge key={tag} variant="outline">
										{tag}
									</Badge>
								))}
							</Flex>
						</Flex>
					</div>
				</div>
			</Card>
		</Link>
	);
}
