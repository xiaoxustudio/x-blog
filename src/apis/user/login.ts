import { Post } from "@/axios";

interface LoginProp {
	username: string;
	password: string;
}

function Login({ username, password }: LoginProp) {
	return Post("/api/user/login", { username, password });
}

export default Login;
