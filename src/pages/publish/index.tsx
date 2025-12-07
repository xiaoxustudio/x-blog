import { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import Editor from "@/components/Editor/";
import useUser from "@/store/user";
import { useNavigate } from "react-router";
import { Button } from "@/components/Button";
import {
	Badge,
	Box,
	Card,
	Checkbox,
	Flex,
	Grid,
	Heading,
	ScrollArea,
	Text,
	TextArea,
	TextField
} from "@radix-ui/themes";
import type { TagMetadata } from "@/types";
import GetTags from "@/apis/common/tags";
import { Plus } from "lucide-react";
import TagsDialog from "./tagsDialog";
import { PostsLimitMap } from "@/lib/consts";
import { articleSchema, type ArticleFormData } from "@/lib/schemas";
// import UpdatePublish from "@/apis/user/publish";
// import { toast } from "sonner";

export default function ArticlePublishPage() {
	const [tagsData, setTagsData] = useState<TagMetadata[]>([]);
	const { token, user } = useUser();
	const navigate = useNavigate();

	const {
		register,
		handleSubmit,
		control,
		setValue,
		watch,
		formState: { errors, isSubmitting }
	} = useForm<ArticleFormData>({
		resolver: zodResolver(articleSchema),
		defaultValues: {
			title: "",
			excerpt: "",
			content: "",
			author: user!.username || "",
			date: new Date().toISOString().split("T")[0],
			coverImage: "",
			tags: [],
			featured: false
		},
		mode: "onTouched"
	});

	useEffect(() => {
		GetTags().then(({ data }) => {
			setTagsData(data.data);
		});
	}, []);

	if (!token || !user) {
		navigate("/login");
		return null;
	}

	const onSubmit = async (data: ArticleFormData) => {
		const articleToSubmit = {
			...data,
			tags: data.tags?.join(",")
		};

		console.log("提交的数据:", articleToSubmit);

		// UpdatePublish(articleToSubmit)
		// 	.then(({ data }) => {
		// 		if (data.code !== 0) { // 假设 0 表示成功
		// 			toast.error(data.msg);
		// 		} else {
		// 			toast.success("文章发布成功！");
		// 		}
		// 	})
		// 	.finally(() => {
		// 		// isSubmitting 状态会由 RHF 自动管理
		// 	});
	};

	return (
		<div className="container mx-auto max-w-4xl p-4 md:p-6 lg:p-8">
			<Card>
				<Flex direction="column" gap="2" className="pb-4">
					<Heading>发布新文章</Heading>
					<Text as="p" size="2">
						填写下方表单来创建你的文章。
					</Text>
				</Flex>
				<Box>
					<form
						onSubmit={handleSubmit(onSubmit)}
						className="space-y-6"
					>
						{/* 标题和作者 */}
						<Grid columns={{ xs: "1", md: "2" }} gap="4">
							<div className="space-y-2">
								<label htmlFor="title">
									文章标题
									<Text size="1">
										{/* eslint-disable-next-line react-hooks/incompatible-library */}
										({watch("title").length}/
										{PostsLimitMap.TitleMaxLength})
									</Text>
								</label>
								<TextField.Root
									id="title"
									{...register("title")}
									maxLength={PostsLimitMap.TitleMaxLength}
									minLength={PostsLimitMap.TitleMinLength}
									placeholder="输入一个吸引人的标题"
								/>
								{errors.title && (
									<Text color="red" size="1">
										{errors.title.message}
									</Text>
								)}
							</div>
							<div className="space-y-2">
								<label htmlFor="author">作者</label>
								<TextField.Root
									id="author"
									{...register("author")}
									placeholder="张三"
									disabled
								/>
								{errors.author && (
									<Text color="red" size="1">
										{errors.author.message}
									</Text>
								)}
							</div>
						</Grid>

						{/* 摘要和封面图 */}
						<Grid columns={{ xs: "1", md: "2" }} gap="4">
							<Grid
								columns={{ md: "1" }}
								className="space-y-2 md:col-span-1"
							>
								<label htmlFor="excerpt">
									文章摘要
									<Text size="1">
										({watch("excerpt").length}/
										{PostsLimitMap.ExcerptMaxLength})
									</Text>
								</label>
								<TextArea
									id="excerpt"
									{...register("excerpt")}
									placeholder="简要描述文章内容，用于 SEO 和列表展示"
									rows={3}
								/>
								{errors.excerpt && (
									<Text color="red" size="1">
										{errors.excerpt.message}
									</Text>
								)}
							</Grid>
							<Grid columns={{ md: "1" }} className="space-y-2">
								<label htmlFor="coverImage">封面图 URL</label>
								<TextField.Root
									id="coverImage"
									type="url"
									{...register("coverImage")}
									placeholder="https://images.unsplash.com/..."
								/>
								{errors.coverImage && (
									<Text color="red" size="1">
										{errors.coverImage.message}
									</Text>
								)}
							</Grid>
						</Grid>

						{/* 内容编辑器 */}
						<div className="space-y-2">
							<label htmlFor="content">正文内容</label>
							<Controller
								name="content"
								control={control}
								render={({ field }) => (
									<Editor
										value={field.value}
										onChange={field.onChange}
										maxLength={
											PostsLimitMap.ContentMaxLength
										}
										minLength={
											PostsLimitMap.ContentMinLength
										}
									/>
								)}
							/>
							{errors.content && (
								<Text color="red" size="1">
									{errors.content.message}
								</Text>
							)}
						</div>

						{/* 标签、日期和特色文章 */}
						<Grid columns={{ xs: "1", md: "3" }} gap="4">
							<Flex
								direction="column"
								justify="between"
								className="space-y-2"
							>
								<label htmlFor="tags">标签</label>
								<Flex align="center" direction="row" gap="2">
									<ScrollArea
										type="always"
										scrollbars="horizontal"
										style={{
											width: "100%",
											height: "35px"
										}}
									>
										<Flex gap="2" align="end">
											{watch("tags")?.map((name) => (
												<Badge
													key={name}
													children={name}
												/>
											))}
										</Flex>
									</ScrollArea>
									<Flex align="start" className="relative">
										<TagsDialog
											tags={tagsData}
											selectData={watch("tags") || []}
											trigger={
												<Button
													mode="icon"
													variant="soft"
												>
													<Plus
														width="18"
														height="18"
													/>
												</Button>
											}
											onChange={(newTags) =>
												setValue("tags", newTags, {
													shouldValidate: true
												})
											}
										/>
									</Flex>
								</Flex>
								{errors.tags && (
									<Text color="red" size="1">
										{errors.tags.message}
									</Text>
								)}
							</Flex>
							<Flex direction="column" className="space-y-2">
								<label htmlFor="date">发布日期</label>
								<TextField.Root
									id="date"
									type="date"
									{...register("date")}
									disabled
								/>
								{errors.date && (
									<Text color="red" size="1">
										{errors.date.message}
									</Text>
								)}
							</Flex>
							<Flex align="start" className="space-x-2 pt-10">
								<Controller
									name="featured"
									control={control}
									render={({ field }) => (
										<Checkbox
											id="featured"
											checked={field.value}
											onCheckedChange={field.onChange}
										/>
									)}
								/>
								<label
									htmlFor="featured"
									className="pl-2 text-sm leading-none font-medium"
								>
									设为特色文章
								</label>
							</Flex>
						</Grid>

						{/* 提交按钮 */}
						<Flex justify="end">
							<Button
								type="submit"
								mode="primary"
								disabled={isSubmitting}
							>
								{isSubmitting ? "发布中..." : "发布文章"}
							</Button>
						</Flex>
					</form>
				</Box>
			</Card>
		</div>
	);
}
