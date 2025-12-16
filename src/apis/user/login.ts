import { Post } from "@/axios";

interface LoginProp {
	username: string;
	password: string;
	code: string;
}

function Login({ username, password, code }: LoginProp) {
	return Post("/api/user/login", { username, password, code });
}

export default Login;
