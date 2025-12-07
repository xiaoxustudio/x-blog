import { z } from "zod";
import { PostsLimitMap } from "@/lib/consts";

export const articleSchema = z.object({
	title: z
		.string()
		.min(
			PostsLimitMap.TitleMinLength,
			`标题至少需要 ${PostsLimitMap.TitleMinLength} 个字符`
		)
		.max(
			PostsLimitMap.TitleMaxLength,
			`标题不能超过 ${PostsLimitMap.TitleMaxLength} 个字符`
		),

	excerpt: z
		.string()
		.min(
			PostsLimitMap.ExcerptMinLength,
			`摘要至少需要 ${PostsLimitMap.ExcerptMinLength} 个字符`
		)
		.max(
			PostsLimitMap.ExcerptMaxLength,
			`摘要不能超过 ${PostsLimitMap.ExcerptMaxLength} 个字符`
		),

	content: z
		.string()
		.min(
			PostsLimitMap.ContentMinLength,
			`正文至少需要 ${PostsLimitMap.ContentMinLength} 个字符`
		)
		.max(
			PostsLimitMap.ContentMaxLength,
			`正文不能超过 ${PostsLimitMap.ContentMaxLength} 个字符`
		),

	author: z.string().min(1, "作者是必填项"),

	date: z.string().min(1, "发布日期是必填项"),

	coverImage: z.string(),

	tags: z.array(z.string()).min(1, `标题至少需要一个标签`),

	featured: z.boolean()
});

export type ArticleFormData = z.infer<typeof articleSchema>;
