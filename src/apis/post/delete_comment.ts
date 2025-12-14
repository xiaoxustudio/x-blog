import { Post } from "@/axios";

interface DeleteCommentProp {
	post_id: number; // 文章ID
	comment_id: number;
}

function DeleteComment({ comment_id, post_id }: DeleteCommentProp) {
	return Post("/api/post/delete_comment", { comment_id, post_id });
}

export default DeleteComment;
