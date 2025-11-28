import { type Post } from "@/data/posts";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, User } from "lucide-react";
import { Link } from "react-router-dom";

interface FeaturedPostProps {
	post: Post;
}

export function FeaturedPost({ post }: FeaturedPostProps) {
	return (
		<Link to={`/articles/${post.id}`}>
			<Card className="overflow-hidden shadow-lg border-gray-200">
				<div className="md:flex">
					<div className="md:w-1/2">
						<img
							src={post.coverImage}
							alt={post.title}
							className="h-64 w-full object-cover md:h-full"
						/>
					</div>
					<div className="p-6 md:w-1/2 flex flex-col justify-between">
						<div>
							<Badge variant="secondary" className="mb-2">
								精选
							</Badge>
							<CardHeader className="p-0">
								<CardTitle className="text-2xl">
									{post.title}
								</CardTitle>
								<CardDescription className="text-base mt-2">
									{post.excerpt}
								</CardDescription>
							</CardHeader>
						</div>
						<CardContent className="p-0 mt-4">
							<div className="flex items-center text-sm text-muted-foreground">
								<User className="mr-1 h-4 w-4" />
								<span className="mr-4">{post.author}</span>
								<Calendar className="mr-1 h-4 w-4" />
								<span>{post.date}</span>
							</div>
							<div className="flex gap-2 mt-3">
								{post.tags.map((tag) => (
									<Badge key={tag} variant="outline">
										{tag}
									</Badge>
								))}
							</div>
						</CardContent>
					</div>
				</div>
			</Card>
		</Link>
	);
}
