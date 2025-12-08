import { Post } from "@/axios";

interface RegisterProp {
	username: string;
	password: string;
	email: string;
}

function Register({ username, password, email }: RegisterProp) {
	return Post("/api/user/register", { username, password, email });
}

export default Register;
