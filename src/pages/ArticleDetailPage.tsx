import { useParams, useNavigate } from "react-router";
import { ArrowLeft, Calendar, MoveLeft, MoveRight, User } from "lucide-react";
import Editor from "@/components/Editor";
import { Button } from "@/components/Button";
import {
	Badge,
	Box,
	Flex,
	Heading,
	ScrollArea,
	Skeleton,
	Text,
	TextArea
} from "@radix-ui/themes";
import { useCallback, useEffect, useMemo, useState } from "react";
import GetPosts from "@/apis/common/posts";
import { toast } from "sonner";
import usePostsStore from "@/store/posts";
import useUser from "@/store/user";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { commentSchema } from "@/lib/schemas";
import AddComment from "@/apis/post/add_comment";
import { useRequest } from "ahooks";
import GetComment from "@/apis/post/get_comment";
import Comment from "@/components/Comment";
import type { IComment, ICommentWithChildren } from "@/types";
import AvatarUser from "@/components/AvatarUser";
import { CommentContext } from "@/components/Comment/context";

function ArticleDetailPage() {
	const { id } = useParams<{ id: string }>();
	const { user, token } = useUser();
	const navigate = useNavigate();
	const { setPosts, posts } = usePostsStore();
	const {
		register,
		formState: { errors },
		control,
		handleSubmit,
		reset
	} = useForm({
		resolver: zodResolver(commentSchema),
		defaultValues: { content: "" },
		mode: "onTouched"
	});

	const [currentComment, setCurrentComment] = useState<IComment | null>(null);
	const [showChilren, setShowChilrenId] = useState<number | null>(null);

	const { data, run, loading } = useRequest(GetComment, {
		manual: true,
		debounceWait: 300
	});

	const isLoging = useMemo(() => token && user, [token, user]);
	const post = useMemo(
		() => posts.find((post) => post.id === Number.parseInt(id || "")),
		[id, posts]
	);
	const comments = useMemo(
		() =>
			((data?.data?.data.comments || []) as IComment[]).filter(
				(v) => v.parent_id === 0
			),
		[data]
	);

	const total = useMemo(() => data?.data.data.total || [], [data]);

	const contentValue = useWatch({ name: "content", control });
	const [pageNum, setPageNum] = useState(0);

	const handleUpdateComment = useCallback(() => {
		if (post) run({ post_id: post.id, page_num: pageNum });
	}, [pageNum, post, run]);

	useEffect(() => {
		handleUpdateComment();
	}, [handleUpdateComment]);

	useEffect(() => {
		GetPosts().then(({ data }) => {
			if (~data.code) {
				setPosts(data.data);
			} else {
				toast.error(data.msg);
			}
		});
	}, []); // eslint-disable-line react-hooks/exhaustive-deps

	if (!post) {
		return (
			<div className="container mx-auto px-4 py-12 text-center">
				<h1 className="mb-4 text-4xl font-bold">404 - 文章未找到</h1>
				<p className="text-muted-foreground mb-8">
					抱歉，您访问的文章不存在。
				</p>
				<Button mode="clear" onClick={() => navigate(-1)}>
					返回文章列表
				</Button>
			</div>
		);
	}

	const onSubmit = handleSubmit(() => {
		AddComment({
			content: contentValue,
			parent_id: 0,
			post_id: post.id
		}).then(({ data }) => {
			if (~data.code) {
				toast.success("评论成功");
				run({ post_id: post.id, page_num: pageNum });
				reset();
			} else {
				toast.error(data.msg);
			}
		});
	});

	const itemsPerPage = 5;
	const totalPages = Math.ceil(total / itemsPerPage);
	const maxPage = totalPages - 1;

	return (
		<div className="container mx-auto max-w-4xl px-4 py-12">
			<Box className="sticky top-25 z-50 -ml-40 block">
				<Button
					mode="clear"
					className="mb-6"
					onClick={() => navigate(-1)}
				>
					<ArrowLeft className="mr-2 h-4 w-4" />
					返回文章列表
				</Button>
			</Box>

			<article>
				<header className="mb-8">
					<h1 className="mb-4 text-4xl font-bold tracking-tight md:text-5xl">
						{post.title}
					</h1>
					<div className="text-muted-foreground mb-4 flex items-center text-sm">
						<User className="mr-1 h-4 w-4" />
						<span className="mr-4">{post.author}</span>
						<Calendar className="mr-1 h-4 w-4" />
						<span>{post.date}</span>
					</div>
					<div className="flex flex-wrap gap-2">
						{post.tags.split(",").map((tag) => (
							<Badge key={tag} color="gray">
								{tag}
							</Badge>
						))}
					</div>
				</header>

				<img
					src={post.cover_image}
					alt={post.title}
					className="mb-8 h-64 w-full rounded-lg object-cover md:h-96"
				/>

				<div className="prose prose-lg max-w-none">
					<Editor value={post.content} readonly={true}></Editor>
				</div>
				{isLoging && (
					<CommentContext.Provider
						value={{
							current: currentComment,
							showChilrenId: showChilren,
							setShowChilrenId,
							setCurrent: setCurrentComment
						}}
					>
						<Flex direction="column" className="mt-4">
							<Heading size="6">评论</Heading>
							<Flex className="ml-2">
								<AvatarUser user={user} />
								<TextArea
									{...register("content")}
									className="w-full"
									placeholder="请输入评论内容"
								/>
							</Flex>
							<Flex
								align="center"
								justify="end"
								gap="2"
								className="w-full ml-2"
							>
								<Flex>
									<Text size="1">
										当前字符：{contentValue.length}/500
									</Text>
								</Flex>
								{errors.content && (
									<Text color="red" size="1">
										{errors.content.message}
									</Text>
								)}
								<Button mode="primary" onClick={onSubmit}>
									发布
								</Button>
							</Flex>

							<Skeleton loading={loading}>
								<Flex direction="column" className="mt-4">
									{comments.map((comment: IComment) => (
										<Comment
											key={comment.id}
											comment={
												comment as ICommentWithChildren
											}
											onSubmitFinally={() =>
												handleUpdateComment()
											}
										/>
									))}
								</Flex>
								<ScrollArea>
									{total > 0 && total % 5 !== 0 && (
										<Flex justify="between" align="center">
											<Button
												disabled={!(pageNum > 0)}
												mode="icon"
												onClick={() =>
													setPageNum(
														Math.max(pageNum - 1, 0)
													)
												}
											>
												<MoveLeft />
											</Button>
											<Badge>第{pageNum}页</Badge>
											<Button
												disabled={pageNum >= maxPage}
												mode="icon"
												onClick={() =>
													setPageNum(
														Math.min(
															pageNum + 1,
															maxPage
														)
													)
												}
											>
												<MoveRight />
											</Button>
										</Flex>
									)}
								</ScrollArea>
							</Skeleton>
						</Flex>
					</CommentContext.Provider>
				)}
			</article>
		</div>
	);
}

export default ArticleDetailPage;
