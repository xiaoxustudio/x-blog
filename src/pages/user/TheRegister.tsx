import Register from "@/apis/user/register";
import { Button } from "@/components/Button";
import { registerSchema } from "@/lib/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Flex, Card, TextField, Box, Heading, Text } from "@radix-ui/themes";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { toast } from "sonner";

interface FormProps {
	username: string;
	password: string;
	email: string;
}

function TheRegister() {
	const navigate = useNavigate();
	const {
		register,
		handleSubmit,
		formState: { errors }
	} = useForm<FormProps>({
		resolver: zodResolver(registerSchema),
		defaultValues: {
			username: "",
			password: "",
			email: ""
		},
		mode: "onTouched"
	});

	const [isLoading, setIsLoading] = useState(false);

	const onSubmit = ({ username, password, email }: FormProps) => {
		setIsLoading(true);

		Register({ username, password, email })
			.then(({ data }) => {
				if (~data.code) {
					toast.success(data.msg);
					navigate("/login");
				} else {
					toast.error(data.msg);
				}
			})
			.finally(() => {
				setIsLoading(false);
			});
	};

	return (
		<Flex
			align="center"
			justify="center"
			className="bg-background min-h-screen"
		>
			<Card className="w-full max-w-md">
				<Flex gap="2" direction="column">
					<Heading>注册</Heading>
					<Text as="p" size="2">
						创建一个新账户以开始使用
					</Text>
				</Flex>
				<form onSubmit={handleSubmit(onSubmit)}>
					<Box className="space-y-4">
						<div className="space-y-2">
							<label htmlFor="name">用户名</label>
							<TextField.Root
								{...register("username")}
								id="name"
								type="text"
								placeholder="用户名"
								required
							/>
							{errors.username && (
								<Text color="red" size="1">
									{errors.username.message}
								</Text>
							)}
						</div>

						<div className="space-y-2">
							<label htmlFor="email">邮箱</label>
							<TextField.Root
								{...register("email")}
								id="email"
								type="email"
								placeholder="m@example.com"
								required
							/>
						</div>
						<div className="space-y-2">
							<label htmlFor="password">密码</label>
							<TextField.Root
								{...register("password")}
								id="password"
								type="password"
								placeholder="密码"
								required
							/>
							{errors.password && (
								<Text color="red" size="1">
									{errors.password.message}
								</Text>
							)}
						</div>
					</Box>
					<Flex direction="column" className="space-y-4">
						<Button
							type="submit"
							mode="primary"
							className="w-full"
							disabled={isLoading}
						>
							{isLoading ? "处理中..." : "注册"}
						</Button>
						<Flex
							gap="2"
							align="center"
							justify="between"
							className="text-sm"
						>
							已有账户？
							<Button onClick={() => navigate("/login")}>
								立即登录
							</Button>
						</Flex>
					</Flex>
				</form>
			</Card>
		</Flex>
	);
}
export default TheRegister;
