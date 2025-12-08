import type { Post } from "@/types";
import { create } from "zustand";

interface PostsStore {
	posts: Post[];
}
interface PostsStoreActions {
	setPosts: (posts: Post[]) => void;
}

const usePostsStore = create<PostsStore & PostsStoreActions>()((set) => ({
	posts: [] as Post[],
	setPosts: (posts: Post[]) => set(() => ({ posts }))
}));
export default usePostsStore;
