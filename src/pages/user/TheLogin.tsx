import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import Login from "@/apis/user/login";
import { Button } from "@/components/Button";
import { loginSchema } from "@/lib/schemas";
import useUser from "@/store/user";
import { zodResolver } from "@hookform/resolvers/zod";
import { Flex, Card, TextField, Heading, Text, Box } from "@radix-ui/themes";
import { useNavigate } from "react-router";

interface FormProps {
	username: string;
	password: string;
}

function TheLogin() {
	const navigate = useNavigate();
	const {
		register,
		handleSubmit,
		formState: { errors }
	} = useForm<FormProps>({
		resolver: zodResolver(loginSchema),
		defaultValues: {
			username: "",
			password: ""
		},
		mode: "onTouched"
	});

	const [isLoading, setIsLoading] = useState(false);

	const { setToken } = useUser();

	const onSubmit = ({ username, password }: FormProps) => {
		setIsLoading(true);
		Login({ username, password })
			.then(({ data }) => {
				if (~data.code) {
					setToken(data.data);
					toast.success(data.msg);
					navigate("/profile");
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
					<Heading>登录</Heading>
					<Text as="p" size="2">
						输入您的邮箱以登录您的账户
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
							{isLoading ? "处理中..." : "登录"}
						</Button>
						<Flex
							gap="2"
							align="center"
							justify="between"
							className="text-sm"
						>
							还没有账户？
							<Button onClick={() => navigate("/register")}>
								立即注册
							</Button>
						</Flex>
					</Flex>
				</form>
			</Card>
		</Flex>
	);
}

export default TheLogin;
