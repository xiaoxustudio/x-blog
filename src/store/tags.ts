import type { TagMetadata } from "@/types";
import { create } from "zustand";

interface TagsStore {
	tags: TagMetadata[];
}
interface TagsStoreActions {
	setTags: (tags: TagMetadata[]) => void;
}

const useTagsStore = create<TagsStore & TagsStoreActions>()((set) => ({
	tags: [] as TagMetadata[],
	setTags: (tags: TagMetadata[]) => set(() => ({ tags }))
}));
export default useTagsStore;
