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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { toast } from "sonner";

export default function ProfilePage() {
	const [pageMode, setPageMode] = useState<"login" | "register">("login");
	const isLoginMode = useMemo(() => pageMode === "login", [pageMode]);
	const [isLoading, setIsLoading] = useState(false);
	const [username, setUsername] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const { token, user, setToken, setUser } = useUser();

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		setIsLoading(true);
		if (isLoginMode) {
			// 登录逻辑
			Login({ username, password })
				.then(({ data }) => {
					if (~data.code) {
						setToken(data.data);
						toast.success(data.msg);
					} else {
						toast.error(data.msg);
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
			GetInfo().then(({ data }) => {
				if (~data.code) {
					setUser(data.data);
				} else {
					setToken("");
					toast.error(data.msg);
				}
			});
		}
	}, []); // eslint-disable-line

	if (!token || !user) {
		return (
			<div className="flex items-center justify-center min-h-screen bg-background">
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
			</div>
		);
	}

	const avatarFallback = user.nickname
		? user.nickname.charAt(0).toUpperCase()
		: user.username.charAt(0).toUpperCase();

	const formattedDate = new Date(user.createdAt).toLocaleDateString("zh-CN", {
		year: "numeric",
		month: "long",
		day: "numeric"
	});

	return (
		<div className="flex items-center justify-center min-h-screen bg-background">
			<Card className="w-full max-w-md">
				<CardHeader className="flex flex-row items-center space-y-0 pb-4">
					<Avatar className="h-16 w-16">
						<AvatarImage
							src={user.avatar}
							alt={user.nickname || user.username}
						/>
						<AvatarFallback className="text-lg">
							{avatarFallback}
						</AvatarFallback>
					</Avatar>
					<div className="ml-4 space-y-1">
						<CardTitle className="text-2xl">
							{user.nickname || user.username}
						</CardTitle>
						<CardDescription>@{user.username}</CardDescription>
					</div>
				</CardHeader>
				<CardContent className="space-y-4">
					<div className="flex items-center space-x-2 rounded-md p-2">
						<Label className="text-sm font-medium w-20">邮箱</Label>
						<p className="text-sm text-muted-foreground flex-1">
							{user!.email}
						</p>
					</div>
					<div className="flex items-center space-x-2 rounded-md p-2">
						<Label className="text-sm font-medium w-20">
							注册时间
						</Label>
						<p className="text-sm text-muted-foreground flex-1">
							{formattedDate}
						</p>
					</div>
				</CardContent>
				<CardFooter className="flex justify-between">
					<Button variant="outline">编辑资料</Button>
					<Button variant="outline" onClick={() => setToken("")}>
						退出登录
					</Button>
				</CardFooter>
			</Card>
		</div>
	);
}
