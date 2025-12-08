import { Post } from "@/axios";

function GetPublishPosts() {
	return Post("/api/user/publish_posts");
}

export default GetPublishPosts;
