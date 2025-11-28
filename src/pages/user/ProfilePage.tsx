import { useMemo, useState } from "react";
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
import useUser from "@/store/useUser"; // 假设你的 useUser store 在这里

export default function ProfilePage() {
	const [pageMode, setPageMode] = useState<"login" | "register">("login");
	const [isLoading, setIsLoading] = useState(false);
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const { token } = useUser();
	const isLogin = useMemo(() => !!token, [token]);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setIsLoading(true);
		if (isLogin) {
			// 登录逻辑
		} else {
			// 注册逻辑
		}
		setTimeout(() => {
			setIsLoading(false);
		}, 100);
	};

	return (
		<div className="flex items-center justify-center min-h-screen bg-background">
			<Card className="w-full max-w-md">
				<CardHeader>
					<CardTitle>
						{pageMode !== "login" ? "登录" : "注册"}
					</CardTitle>
					<CardDescription>
						{pageMode !== "login"
							? "输入您的邮箱以登录您的账户"
							: "创建一个新账户以开始使用"}
					</CardDescription>
				</CardHeader>
				<form onSubmit={handleSubmit}>
					<CardContent className="space-y-4">
						{pageMode === "login" && (
							<div className="space-y-2">
								<Label htmlFor="name">用户名</Label>
								<Input
									id="name"
									type="text"
									placeholder="用户名"
									value={name}
									onChange={(e) => setName(e.target.value)}
									required
								/>
							</div>
						)}
						<div className="space-y-2">
							<Label htmlFor="email">邮箱</Label>
							<Input
								id="email"
								type="email"
								placeholder="m@example.com"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								required
							/>
						</div>
						<div className="space-y-2">
							<Label htmlFor="password">密码</Label>
							<Input
								id="password"
								type="password"
								value={password}
								onChange={(e) => setPassword(e.target.value)}
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
								: pageMode !== "login"
									? "登录"
									: "注册"}
						</Button>
						<div className="text-sm text-muted-foreground">
							{pageMode === "login"
								? "还没有账户？"
								: "已有账户？"}
							<Button
								type="button"
								variant="link"
								className="p-0 h-auto font-normal"
								onClick={() =>
									setPageMode(
										pageMode === "login"
											? "register"
											: "login"
									)
								}
							>
								{pageMode === "login" ? "立即登录" : "立即注册"}
							</Button>
						</div>
					</CardFooter>
				</form>
			</Card>
		</div>
	);
}
