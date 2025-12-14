import { Post } from "@/axios";

interface EditCommentProp {
	post_id: number; // 文章ID
	content: string;
	comment_id: number;
}

function EditComment({ content, comment_id, post_id }: EditCommentProp) {
	return Post("/api/post/edit_comment", { content, comment_id, post_id });
}

export default EditComment;
