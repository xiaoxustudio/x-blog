import { useEffect, useMemo, useState } from "react";

import useUser from "@/store/user";
import Login from "@/apis/user/login";
import GetInfo from "@/apis/user/info";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/Button";
import {
	Avatar,
	Box,
	Card,
	Flex,
	Heading,
	Text,
	TextField
} from "@radix-ui/themes";

export default function ProfilePage() {
	const [pageMode, setPageMode] = useState<"login" | "register">("login");
	const isLoginMode = useMemo(() => pageMode === "login", [pageMode]);
	const [isLoading, setIsLoading] = useState(false);
	const [username, setUsername] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const { token, user, setToken, setUser } = useUser();

	const navigate = useNavigate();

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
			<Flex
				align="center"
				justify="center"
				className="bg-background min-h-screen"
			>
				<Card className="w-full max-w-md">
					<Flex gap="2" direction="column">
						<Heading>{isLoginMode ? "登录" : "注册"}</Heading>
						<Text as="p" size="2">
							{isLoginMode
								? "输入您的邮箱以登录您的账户"
								: "创建一个新账户以开始使用"}
						</Text>
					</Flex>
					<form onSubmit={handleSubmit}>
						<Box className="space-y-4">
							<div className="space-y-2">
								<label htmlFor="name">用户名</label>
								<TextField.Root
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
									<label htmlFor="email">邮箱</label>
									<TextField.Root
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
								<label htmlFor="password">密码</label>
								<TextField.Root
									id="password"
									type="password"
									value={password}
									onChange={(e) =>
										setPassword(e.target.value)
									}
									required
								/>
							</div>
						</Box>
						<Flex direction="column" className="space-y-4">
							<Button
								type="submit"
								mode="primary"
								className="w-full"
								disabled={isLoading}
							>
								{isLoading
									? "处理中..."
									: isLoginMode
										? "登录"
										: "注册"}
							</Button>
							<Flex
								gap="2"
								align="center"
								justify="between"
								className="text-sm"
							>
								{isLoginMode ? "还没有账户？" : "已有账户？"}
								<Button
									onClick={() =>
										setPageMode(
											isLoginMode ? "register" : "login"
										)
									}
								>
									{!isLoginMode ? "立即登录" : "立即注册"}
								</Button>
							</Flex>
						</Flex>
					</form>
				</Card>
			</Flex>
		);
	}

	const avatarFallback = user.nickname
		? user.nickname.charAt(0).toUpperCase()
		: user.username.charAt(0).toUpperCase();

	const formattedDate = new Date(user.createdAt).toLocaleDateString("zh-CN", {
		year: "numeric",
		month: "long",
		day: "numeric",
		hour: "numeric",
		minute: "numeric",
		second: "numeric"
	});

	return (
		<div className="bg-background flex min-h-screen items-center justify-center">
			<Card className="w-full max-w-md">
				<Flex direction="row" align="center" className="space-y-0 pb-4">
					<Avatar
						className="h-16 w-16"
						src={user.avatar}
						alt={user.nickname || user.username}
						fallback={avatarFallback}
					/>
					<div className="ml-4 space-y-1">
						<Text className="text-2xl">
							{user.nickname || user.username}
						</Text>
						<Text>@{user.username}</Text>
					</div>
				</Flex>
				<Box className="space-y-4">
					<Flex align="center" className="space-x-2 rounded-md pb-2">
						<label className="w-20 text-sm font-medium">邮箱</label>
						<p className="text-muted-foreground flex-1 text-sm">
							{user!.email}
						</p>
					</Flex>
					<Flex align="center" className="space-x-2 rounded-md pb-2">
						<label className="w-20 text-sm font-medium">
							注册时间
						</label>
						<p className="text-muted-foreground flex-1 text-sm">
							{formattedDate}
						</p>
					</Flex>
				</Box>
				<Flex justify="between">
					<Button
						onClick={() => navigate("/edit", { replace: true })}
					>
						编辑资料
					</Button>
					<Button onClick={() => setToken("")}>退出登录</Button>
				</Flex>
			</Card>
		</div>
	);
}
