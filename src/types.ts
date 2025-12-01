export interface Post {
	id: number;
	title: string;
	excerpt: string;
	content: string;
	author: string;
	date: string;
	coverImage: string;
	tags: string[];
	featured: boolean;
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
