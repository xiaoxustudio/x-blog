import type { ICommentWithChildren } from "@/types";
import {
	Box,
	DropdownMenu,
	Flex,
	Heading,
	ScrollArea,
	Text,
	TextArea
} from "@radix-ui/themes";
import AvatarUser from "../AvatarUser";
import useUser from "@/store/user";
import { Button } from "../Button";
import { Menu } from "lucide-react";
import { useContext, useMemo } from "react";
import { CommentContext } from "./context";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { commentSchema } from "@/lib/schemas";
import AddComment from "@/apis/post/add_comment";
import { toast } from "sonner";

interface Props {
	comment: ICommentWithChildren;
	parent?: ICommentWithChildren;
	onSubmitFinally?: (code: number) => void;
}

function Comment({ comment, parent, onSubmitFinally }: Props) {
	const { user } = useUser();
	const { current, showChilrenId, setShowChilrenId, setCurrent } =
		useContext(CommentContext);

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

	const contentValue = useWatch({ name: "content", control });

	const onSubmit = handleSubmit(() => {
		AddComment({
			content: contentValue,
			parent_id: current?.id || 0,
			post_id: comment.post_id
		}).then(({ data }) => {
			if (~data.code) {
				toast.success("回复评论成功");
				reset();
			} else {
				toast.error(data.msg);
			}
			onSubmitFinally?.(data.code);
		});
	});

	const isCommentChildren = comment.children.length > 0;
	const timeArr = useMemo(
		() => comment.created_at.split(" "),
		[comment.created_at]
	);

	return (
		<>
			<Flex
				justify="between"
				gap="2"
				className="my-2 border-b border-gray-200 w-full"
			>
				<Flex>
					<Flex direction="column">
						<AvatarUser user={comment.user_info} />
						{parent && (
							<Text className="text-indigo-500" size="1">
								@{parent.user_id}
							</Text>
						)}
					</Flex>
					<Heading size="1">{comment.user_id}</Heading>
				</Flex>
				<Flex justify="between" className="w-full">
					<ScrollArea className="h-20! w-full" scrollbars="vertical">
						<Box
							className="text-xs"
							dangerouslySetInnerHTML={{
								__html: comment.content.replace(/\n/g, "<br/>")
							}}
						/>
					</ScrollArea>
					<Flex justify="between" gap="2">
						<Flex direction="column" className="w-full text-nowrap">
							<Text size="1" className="text-gray-500">
								{timeArr[0]}
							</Text>
							<Text
								size="1"
								className="text-gray-500"
								align="right"
							>
								{timeArr[1]}
							</Text>
						</Flex>
						<Flex
							direction="column"
							align="center"
							className="w-full text-nowrap"
						>
							<Flex>
								{!parent && (
									<Button
										size="1"
										onClick={() => {
											if (current?.id == comment.id) {
												setCurrent(
													current ? null : comment
												);
											} else {
												setCurrent(comment);
											}
										}}
									>
										回复
									</Button>
								)}

								{comment.user_id === user?.username && (
									<DropdownMenu.Root>
										<DropdownMenu.Trigger>
											<Button mode="icon" size="1">
												<Menu size="16" />
											</Button>
										</DropdownMenu.Trigger>
										<DropdownMenu.Content size="1">
											<DropdownMenu.Item disabled>
												编辑
											</DropdownMenu.Item>

											<DropdownMenu.Separator />
											<DropdownMenu.Item
												shortcut="⌘ ⌫"
												color="red"
												disabled
											>
												删除
											</DropdownMenu.Item>
										</DropdownMenu.Content>
									</DropdownMenu.Root>
								)}
							</Flex>
							{isCommentChildren && (
								<Flex>
									<Text
										size="1"
										className="select-none cursor-pointer transition-colors duration-300 border-b-2 border-b-transparent text-blue-700 hover:border-b-blue-700"
										onClick={() =>
											setShowChilrenId(
												showChilrenId
													? showChilrenId !==
														comment.id
														? comment.id
														: null
													: comment.id
											)
										}
									>
										查看评论({comment.children?.length})
									</Text>
								</Flex>
							)}
						</Flex>
					</Flex>
				</Flex>
			</Flex>
			{current?.id == comment.id && !parent && (
				<Flex direction="column" gap="2">
					<Text size="1">
						回复：
						<Text className="text-indigo-500" size="1">
							@{comment.user_id}
						</Text>
					</Text>
					<TextArea
						{...register("content")}
						className="w-full"
						placeholder={`请输入回复 @${comment.user_id} 的评论内容`}
					/>
					{errors.content && (
						<Text color="red" size="1">
							{errors.content.message}
						</Text>
					)}
					<Button size="1" onClick={onSubmit}>
						回复
					</Button>
				</Flex>
			)}
			{isCommentChildren && showChilrenId === comment.id && (
				<Box className="w-full relative top-full left-0">
					<div className="-ml-2 -my-2 bg-gray-400 absolute h-full w-1" />
					{comment.children?.map((item) => (
						<Comment
							key={item.id}
							comment={item as ICommentWithChildren}
							parent={comment}
						/>
					))}
				</Box>
			)}
		</>
	);
}
export default Comment;
