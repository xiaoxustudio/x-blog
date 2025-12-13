import type { IComment } from "@/types";
import { createContext, type Dispatch } from "react";

export interface CommentContextProps {
	showChilrenId: number | null; // 当前展示的子评论id
	setShowChilrenId: Dispatch<number | null>;
	current: IComment | null;
	setCurrent: Dispatch<IComment | null>;
}
export const CommentContext = createContext<CommentContextProps>({
	current: null,
	showChilrenId: null,
	setShowChilrenId: () => null,
	setCurrent: () => null
});
