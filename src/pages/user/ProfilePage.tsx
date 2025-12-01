import { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle
} from "@/components/ui/card";
import useUser from "@/store/useUser";
import Login from "@/apis/user/login";
import GetInfo from "@/apis/user/info";

export default function ProfilePage() {
	const [pageMode, setPageMode] = useState<"login" | "register">("login");
	const isLoginMode = useMemo(() => pageMode === "login", [pageMode]);
	const [isLoading, setIsLoading] = useState(false);
	const [username, setUsername] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const { token, setToken } = useUser();

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		setIsLoading(true);
		if (isLoginMode) {
			// 登录逻辑
			Login({ username, password })
				.then(({ data }) => {
					if (~data.code) {
						setToken(data.data);
					} else {
						console.log(data.msg);
					}
				})
				.finally(() => {
					setIsLoading(false);
				});
		} else {
			// 注册逻辑
		}
	};

	useEffect(() => {
		if (token) {
			GetInfo().then((res) => console.log("徐然", res));
		}
	}, []); // eslint-disable-line

	return (
		<div className="flex items-center justify-center min-h-screen bg-background">
			{token ? (
				<>
					主页<Button onClick={() => setToken("")}>退出登录</Button>
				</>
			) : (
				<Card className="w-full max-w-md">
					<CardHeader>
						<CardTitle>{isLoginMode ? "登录" : "注册"}</CardTitle>
						<CardDescription>
							{isLoginMode
								? "输入您的邮箱以登录您的账户"
								: "创建一个新账户以开始使用"}
						</CardDescription>
					</CardHeader>
					<form onSubmit={handleSubmit}>
						<CardContent className="space-y-4">
							<div className="space-y-2">
								<Label htmlFor="name">用户名</Label>
								<Input
									id="name"
									type="text"
									placeholder="用户名"
									value={username}
									onChange={(e) =>
										setUsername(e.target.value)
									}
									required
								/>
							</div>

							{!isLoginMode && (
								<div className="space-y-2">
									<Label htmlFor="email">邮箱</Label>
									<Input
										id="email"
										type="email"
										placeholder="m@example.com"
										value={email}
										onChange={(e) =>
											setEmail(e.target.value)
										}
										required
									/>
								</div>
							)}
							<div className="space-y-2">
								<Label htmlFor="password">密码</Label>
								<Input
									id="password"
									type="password"
									value={password}
									onChange={(e) =>
										setPassword(e.target.value)
									}
									required
								/>
							</div>
						</CardContent>
						<CardFooter className="flex flex-col space-y-4">
							<Button
								type="submit"
								className="w-full"
								disabled={isLoading}
							>
								{isLoading
									? "处理中..."
									: isLoginMode
										? "登录"
										: "注册"}
							</Button>
							<div className="text-sm text-muted-foreground">
								{isLoginMode ? "还没有账户？" : "已有账户？"}
								<Button
									type="button"
									variant="link"
									className="p-0 h-auto font-normal"
									onClick={() =>
										setPageMode(
											isLoginMode ? "register" : "login"
										)
									}
								>
									{isLoginMode ? "立即登录" : "立即注册"}
								</Button>
							</div>
						</CardFooter>
					</form>
				</Card>
			)}
		</div>
	);
}
