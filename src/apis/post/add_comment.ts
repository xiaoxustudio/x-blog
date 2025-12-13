import { Post } from "@/axios";

interface AddCommentProp {
	post_id: number; // 文章ID
	content: string;
	parent_id: number;
}

function AddComment({ content, parent_id, post_id }: AddCommentProp) {
	return Post("/api/post/add_comment", { content, parent_id, post_id });
}

export default AddComment;
