export interface Post {
	id: number;
	title: string; // 标题
	excerpt: string; // 摘要
	content: string; // markdown
	author: string; // 作者ID
	date: string; // 发布时间
	coverImage: string; // base64 图片文本
	tags: string[]; // 标签
	featured: boolean; // 是否为推荐文章
}

export interface TagMetadata {
	name: string;
	description: string;
	color: string;
}

export interface IUser {
	id: number;
	username: string;
	email: string;
	password: string;
	nickname: string;
	avatar: string; // base64
	createdAt: Date;
}

export interface RepsonseData {
	code: number;
	msg: string;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	data: any;
}
