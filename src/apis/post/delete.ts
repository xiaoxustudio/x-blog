import { Post } from "@/axios";

interface DeletePostProp {
	id: number; // 文章ID
}

function DeletePost({ id }: DeletePostProp) {
	return Post("/api/post/delete", { id });
}

export default DeletePost;
