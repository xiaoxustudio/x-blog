import type { Post } from "@/data/posts";
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

interface PostCardProps {
	post: Post;
}

export function PostCard({ post }: PostCardProps) {
	return (
		<Link to={`/articles/${post.id}`}>
			<Card className="overflow-hidden transition-shadow hover:shadow-lg border-none cursor-pointer">
				<img
					src={post.coverImage}
					alt={post.title}
					className="h-48 w-full object-cover"
				/>
				<CardHeader>
					<CardTitle className="text-xl">{post.title}</CardTitle>
					<CardDescription>{post.excerpt}</CardDescription>
				</CardHeader>
				<CardContent>
					<div className="flex items-center text-sm text-muted-foreground mb-3">
						<User className="mr-1 h-4 w-4" />
						<span className="mr-4">{post.author}</span>
						<Calendar className="mr-1 h-4 w-4" />
						<span>{post.date}</span>
					</div>
					<div className="flex gap-2 flex-wrap">
						{post.tags.map((tag) => (
							<Badge key={tag} variant="secondary">
								{tag}
							</Badge>
						))}
					</div>
				</CardContent>
			</Card>
		</Link>
	);
}
