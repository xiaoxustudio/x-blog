import { Post } from "@/axios";

function GetPosts() {
	return Post("/api/common/posts");
}

export default GetPosts;
