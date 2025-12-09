import type { Post, RepsonseData } from "@/types";
import type { PropsWithChildren } from "react";
import { Badge, Box, Card, ContextMenu, Flex, Text } from "@radix-ui/themes";
import { Calendar, User } from "lucide-react";
import { Link } from "react-router";
import DeletePost from "@/apis/post/delete";
import DuplicatePost from "@/apis/post/duplicate";

interface PostCardProps {
	post: Post;
	context?: boolean;
	onSuccess?: (data: RepsonseData) => void;
	onError?: (data: RepsonseData) => void;
}

interface ParentComponentProps extends PropsWithChildren {
	context: boolean;
	post: Post;
	onSuccess?: (data: RepsonseData) => void;
	onError?: (data: RepsonseData) => void;
}

const ParentComponent = ({
	children,
	context,
	post,
	onError,
	onSuccess
}: ParentComponentProps) => {
	const handleDelete = () => {
		DeletePost({ id: post.id }).then(({ data }) => {
			if (~data.code) {
				onSuccess?.(data);
			} else {
				onError?.(data);
			}
		});
	};

	const handleDuplicate = () => {
		DuplicatePost({ id: post.id }).then(({ data }) => {
			if (~data.code) {
				onSuccess?.(data);
			} else {
				onError?.(data);
			}
		});
	};

	return (
		<>
			{context ? (
				<ContextMenu.Root>
					<ContextMenu.Trigger>{children}</ContextMenu.Trigger>
					<ContextMenu.Content>
						<ContextMenu.Item disabled>
							<Text>ID:{post.id}</Text>
							<Text
								className="w-16 text-ellipsis text-nowrap overflow-hidden"
								size="1"
							>
								{post.title}
							</Text>
						</ContextMenu.Item>
						<ContextMenu.Item
							shortcut="⌘ D"
							onClick={handleDuplicate}
						>
							副本
						</ContextMenu.Item>
						<ContextMenu.Separator />
						<ContextMenu.Item
							shortcut="⌘ ⌫"
							color="red"
							onClick={handleDelete}
						>
							删除
						</ContextMenu.Item>
					</ContextMenu.Content>
				</ContextMenu.Root>
			) : (
				children
			)}
		</>
	);
};

export function PostCard({
	post,
	context = false,
	onError,
	onSuccess
}: PostCardProps) {
	return (
		<ParentComponent
			context={context}
			post={post}
			onError={onError}
			onSuccess={onSuccess}
		>
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
					<Flex direction="column" gap="2" justify="between">
						<Flex wrap="wrap" gap="2">
							{post.tags
								.split(",")
								.slice(0, 3)
								.map((tag) => (
									<Badge key={tag} color="gray">
										{tag}
									</Badge>
								))}
						</Flex>
						<Flex
							align="center"
							justify="between"
							className="text-muted-foreground mr-3 mb-3 text-sm"
						>
							<Text as="p" className="mr-4">
								<User className="inline mr-1 h-4 w-4" />
								{post.author}
							</Text>
							<Text as="p" className="mr-4">
								<Calendar className="inline mr-1 h-4 w-4" />
								{post.date}
							</Text>
						</Flex>
					</Flex>
				</Card>
			</Link>
		</ParentComponent>
	);
}
