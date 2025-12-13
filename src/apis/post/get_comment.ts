import { Post } from "@/axios";
import { PAGESIZE_LIMIT_NUM } from "@/lib/consts";

interface GetCommentProp {
	post_id: number; // 文章ID
	page_size?: number; // 每页数量
	page_num: number; // 页码
	parent_id?: number; // 父评论ID
}

function GetComment({
	post_id,
	page_size = PAGESIZE_LIMIT_NUM,
	page_num,
	parent_id = 0
}: GetCommentProp) {
	return Post("/api/post/get_comment", {
		post_id,
		page_num,
		page_size,
		parent_id
	});
}

export default GetComment;
