import { useState } from "react";

import Editor from "@/components/Editor/";
import useUser from "@/store/user";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/Button";
import {
	Box,
	Card,
	Checkbox,
	Flex,
	Grid,
	Heading,
	Text,
	TextArea,
	TextField
} from "@radix-ui/themes";
// import UpdatePublish from "@/apis/user/publish";
// import { toast } from "sonner";

interface ArticleFormData {
	title: string;
	excerpt: string;
	content: string;
	author: string;
	date: string;
	coverImage: string;
	tags: string[];
	featured: boolean;
}

export default function ArticlePublishPage() {
	const { token, user } = useUser();
	const navigate = useNavigate();
	if (!token || !user) {
		navigate("/login");
	}
	const [formData, setFormData] = useState<ArticleFormData>({
		title: "",
		excerpt: "",
		content: "",
		author: user!.username || "",
		date: new Date().toISOString().split("T")[0],
		coverImage: "",
		tags: [],
		featured: false
	});

	const [isSubmitting, setIsSubmitting] = useState(false);

	const handleInputChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		const { name, value } = e.target;
		switch (name) {
			case "tags": {
				setFormData((prev) => ({
					...prev,
					tags: value.split(",").map((tag) => tag.trim())
				}));
				break;
			}
			case "title": {
				setFormData((prev) => ({
					...prev,
					title: value
				}));
				break;
			}
			case "excerpt": {
				setFormData((prev) => ({
					...prev,
					excerpt: value
				}));
				break;
			}
		}
	};

	const handleContentChange = (value: string) => {
		setFormData((prev) => ({ ...prev, content: value }));
	};

	const handleCheckboxChange = (checked: boolean) => {
		setFormData((prev) => ({ ...prev, featured: checked }));
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setIsSubmitting(true);

		const articleToSubmit = {
			...formData,
			tags: formData.tags.map((tag) => tag.trim()).join(",")
		};

		console.log(articleToSubmit);

		// UpdatePublish(articleToSubmit)
		// 	.then(({ data }) => {
		// 		if (~data.code) {
		// 			toast.error(data.msg);
		// 		} else {
		// 			toast.success("文章发布成功！");
		// 		}
		// 	})
		// 	.finally(() => {
		// 		setIsSubmitting(false);
		// 	});
	};

	return (
		<div className="container mx-auto p-4 md:p-6 lg:p-8 max-w-4xl">
			<Card>
				<Flex direction="column" gap="2" className="pb-4">
					<Heading>发布新文章</Heading>
					<Text as="p" size="2">
						填写下方表单来创建你的文章。
					</Text>
				</Flex>
				<Box>
					<form onSubmit={handleSubmit} className="space-y-6">
						{/* 标题和作者 */}
						<Grid columns={{ xs: "1", md: "2" }} gap="4">
							<div className="space-y-2">
								<label htmlFor="title">文章标题</label>
								<TextField.Root
									id="title"
									name="title"
									value={formData.title}
									onChange={handleInputChange}
									placeholder="输入一个吸引人的标题"
									required
								/>
							</div>
							<div className="space-y-2">
								<label htmlFor="author">作者</label>
								<TextField.Root
									id="author"
									name="author"
									value={formData.author}
									placeholder="张三"
									disabled
								/>
							</div>
						</Grid>

						{/* 摘要和封面图 */}
						<Grid columns={{ xs: "1", md: "2" }} gap="4">
							<Grid
								columns={{ md: "1" }}
								className="space-y-2 md:col-span-1"
							>
								<label htmlFor="excerpt">文章摘要</label>
								<TextArea
									id="excerpt"
									name="excerpt"
									value={formData.excerpt}
									onChange={handleInputChange}
									placeholder="简要描述文章内容，用于 SEO 和列表展示"
									rows={3}
								/>
							</Grid>
							<Grid columns={{ md: "1" }} className="space-y-2">
								<label htmlFor="coverImage">封面图 URL</label>
								<TextField.Root
									id="coverImage"
									name="coverImage"
									type="url"
									value={formData.coverImage}
									onChange={handleInputChange}
									placeholder="https://images.unsplash.com/..."
								/>
							</Grid>
						</Grid>

						{/* 内容编辑器 */}
						<div className="space-y-2">
							<label htmlFor="content">正文内容</label>
							<Editor
								value={formData.content}
								onChange={handleContentChange}
							/>
						</div>

						{/* 标签、日期和特色文章 */}
						<Grid columns={{ xs: "1", md: "3" }} gap="4">
							<div className="space-y-2">
								<label htmlFor="tags">标签</label>
								<TextField.Root
									id="tags"
									name="tags"
									value={formData.tags.join(", ")}
									onChange={handleInputChange}
									placeholder="React, Next.js, 前端 (用逗号分隔)"
								/>
							</div>
							<div className="space-y-2">
								<label htmlFor="date">发布日期</label>
								<TextField.Root
									id="date"
									name="date"
									type="date"
									value={formData.date}
									onChange={handleInputChange}
								/>
							</div>
							<Flex align="center" className="space-x-2 pt-6">
								<Checkbox
									id="featured"
									checked={formData.featured}
									onCheckedChange={handleCheckboxChange}
								/>
								<label
									htmlFor="featured"
									className="pl-2 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
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
