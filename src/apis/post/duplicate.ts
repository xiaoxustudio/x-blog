import { Post } from "@/axios";

interface DuplicatePostProp {
	id: number; // 文章ID
}

function DuplicatePost({ id }: DuplicatePostProp) {
	return Post("/api/post/duplicate", { id });
}

export default DuplicatePost;
