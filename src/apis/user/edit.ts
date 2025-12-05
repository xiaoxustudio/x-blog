import { Post } from "@/axios";

interface EditProp {
	avatar: string;
	nickname: string;
	email: string;
}

function UpdateEdit({ avatar, nickname, email }: EditProp) {
	return Post("/api/user/edit", { avatar, nickname, email });
}

export default UpdateEdit;
