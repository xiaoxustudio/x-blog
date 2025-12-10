import { Post } from "@/axios";

interface SearchPostProp {
	kw: string; // 文章标题
}

function SearchPost({ kw }: SearchPostProp) {
	return Post("/api/post/search", { kw });
}

export default SearchPost;
