import { Post } from "@/axios";

interface GetCommentProp {
	post_id: number; // 文章ID
	page_size?: number; // 每页数量
	page_num: number; // 页码
}

function GetComment({ post_id, page_size = 5, page_num }: GetCommentProp) {
	return Post("/api/post/get_comment", {
		post_id,
		page_num,
		page_size
	});
}

export default GetComment;
