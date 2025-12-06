import { Post } from "@/axios";

interface PublishProp {
	title: string;
	excerpt: string;
	content: string;
	author: string;
	date: string;
	coverImage: string;
	tags: string;
	featured: boolean;
}

function UpdatePublish(data: PublishProp) {
	return Post("/api/user/publish", data);
}

export default UpdatePublish;
