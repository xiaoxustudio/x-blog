import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import Editor from "@/components/Editor/";
import useUser from "@/store/user";
import { useNavigate } from "react-router-dom";
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
		console.log(name);
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
				<CardHeader>
					<CardTitle>发布新文章</CardTitle>
					<CardDescription>
						填写下方表单来创建你的文章。
					</CardDescription>
				</CardHeader>
				<CardContent>
					<form onSubmit={handleSubmit} className="space-y-6">
						{/* 标题和作者 */}
						<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
							<div className="space-y-2">
								<Label htmlFor="title">文章标题</Label>
								<Input
									id="title"
									name="title"
									value={formData.title}
									onChange={handleInputChange}
									placeholder="输入一个吸引人的标题"
									required
								/>
							</div>
							<div className="space-y-2">
								<Label htmlFor="author">作者</Label>
								<Input
									id="author"
									name="author"
									value={formData.author}
									placeholder="张三"
									disabled
								/>
							</div>
						</div>

						{/* 摘要和封面图 */}
						<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
							<div className="space-y-2 md:col-span-1">
								<Label htmlFor="excerpt">文章摘要</Label>
								<Textarea
									id="excerpt"
									name="excerpt"
									value={formData.excerpt}
									onChange={handleInputChange}
									placeholder="简要描述文章内容，用于 SEO 和列表展示"
									rows={3}
								/>
							</div>
							<div className="space-y-2 md:col-span-1">
								<Label htmlFor="coverImage">封面图 URL</Label>
								<Input
									id="coverImage"
									name="coverImage"
									type="url"
									value={formData.coverImage}
									onChange={handleInputChange}
									placeholder="https://images.unsplash.com/..."
								/>
							</div>
						</div>

						{/* 内容编辑器 */}
						<div className="space-y-2">
							<Label htmlFor="content">正文内容</Label>
							<Editor
								value={formData.content}
								onChange={handleContentChange}
							/>
						</div>

						{/* 标签、日期和特色文章 */}
						<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
							<div className="space-y-2">
								<Label htmlFor="tags">标签</Label>
								<Input
									id="tags"
									name="tags"
									value={formData.tags.join(", ")}
									onChange={handleInputChange}
									placeholder="React, Next.js, 前端 (用逗号分隔)"
								/>
							</div>
							<div className="space-y-2">
								<Label htmlFor="date">发布日期</Label>
								<Input
									id="date"
									name="date"
									type="date"
									value={formData.date}
									onChange={handleInputChange}
								/>
							</div>
							<div className="flex items-center space-x-2 pt-6">
								<Checkbox
									id="featured"
									checked={formData.featured}
									onCheckedChange={handleCheckboxChange}
								/>
								<Label
									htmlFor="featured"
									className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
								>
									设为特色文章
								</Label>
							</div>
						</div>

						{/* 提交按钮 */}
						<div className="flex justify-end pt-4">
							<Button type="submit" disabled={isSubmitting}>
								{isSubmitting ? "发布中..." : "发布文章"}
							</Button>
						</div>
					</form>
				</CardContent>
			</Card>
		</div>
	);
}
