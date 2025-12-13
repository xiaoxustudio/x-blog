import type { Post } from "@/types";
import { Badge, Box, Card, Flex } from "@radix-ui/themes";
import { Calendar, User } from "lucide-react";
import { Link } from "react-router";

interface FeaturedPostProps {
	post: Post;
}

export function FeaturedPost({ post }: FeaturedPostProps) {
	return (
		<Link to={`/articles/${post.id}`}>
			<Card className="overflow-hidden transition-shadow hover:shadow-lg">
				<div className="md:flex">
					<div className="md:w-1/2">
						<img
							src={post.cover_image}
							alt={post.title}
							className="h-64 w-full rounded-md object-cover md:h-full"
						/>
					</div>
					<div className="flex flex-col justify-between p-6 md:w-1/2">
						<Box>
							<Badge className="mb-2">精选</Badge>
							<Box className="p-0">
								<Flex className="text-2xl">{post.title}</Flex>
								<Flex className="mt-2 text-base">
									{post.excerpt}
								</Flex>
							</Box>
						</Box>
						<Flex className="mt-4 items-center gap-2 p-0">
							<Flex className="text-muted-foreground items-center text-sm">
								<User className="mr-1 h-4 w-4" />
								<span className="mr-4">{post.author}</span>
								<Calendar className="mr-1 h-4 w-4" />
								<span>{post.date}</span>
							</Flex>
							<Flex className="gap-2">
								{post.tags
									.split(",")
									.slice(0, 3)
									.map((tag) => (
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
