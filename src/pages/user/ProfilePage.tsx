import { useEffect } from "react";
import { toast } from "sonner";

import useUser from "@/store/user";
import GetInfo from "@/apis/user/info";
import { Button } from "@/components/Button";
import { Avatar, Box, Card, Flex, Text } from "@radix-ui/themes";
import { useNavigate } from "react-router";

export default function ProfilePage() {
	const navigate = useNavigate();
	const { token, user, setToken, setUser } = useUser();

	useEffect(() => {
		if (!token || !user) {
			navigate("/login", { replace: true });
		} else if (token) {
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
	if (!token || !user) return;

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
		<Flex
			align="center"
			justify="center"
			className="bg-background min-h-screen"
		>
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
					<Flex gap="2">
						<Button
							onClick={() => navigate("/edit", { replace: true })}
						>
							编辑资料
						</Button>
						<Button onClick={() => navigate("/myposts")}>
							我的文章
						</Button>
					</Flex>
					<Button
						mode="primary"
						onClick={() => {
							setToken("");
							navigate("/login", { replace: true });
						}}
					>
						退出登录
					</Button>
				</Flex>
			</Card>
		</Flex>
	);
}
