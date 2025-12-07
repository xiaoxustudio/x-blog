import React, { useEffect, useState } from "react";

import { toast } from "sonner";
import useUser from "@/store/user";
import GetInfo from "@/apis/user/info";
import { useNavigate } from "react-router-dom";
import UpdateEdit from "@/apis/user/edit";
import { Button } from "@/components/Button";
import { Avatar, Box, Card, Flex, Text, TextField } from "@radix-ui/themes";
import { Calendar, Hash, Mail, Save, Upload, User } from "lucide-react";

interface UserProfile {
	id: number;
	username: string;
	email: string;
	nickname: string;
	avatar: string;
	createdAt: string;
}

const initialProfile: UserProfile = {
	id: -1,
	username: "",
	email: "",
	nickname: "",
	avatar: "",
	createdAt: ""
};

export default function ProfileEditPage() {
	const { token, setToken, setUser } = useUser();
	const [profile, setProfile] = useState<UserProfile>(initialProfile);
	const [isLoading, setIsLoading] = useState(false);
	const [avatarPreview, setAvatarPreview] = useState<string>(profile.avatar);

	const navigate = useNavigate();

	const handleInputChange = (field: keyof UserProfile, value: string) => {
		setProfile((prev) => ({
			...prev,
			[field]: value
		}));
	};

	const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const file = event.target.files?.[0];
		if (file) {
			if (file.size > 5 * 1024 * 1024) {
				toast.error("头像大小不能超过5MB");
				return;
			}

			const reader = new FileReader();
			reader.onloadend = () => {
				const result = reader.result as string;
				setAvatarPreview(result);
				setProfile((prev) => ({
					...prev,
					avatar: result
				}));
			};
			reader.readAsDataURL(file);
		}
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		setIsLoading(true);

		UpdateEdit(profile)
			.then(({ data }) => {
				if (~data.code) {
					toast.error(data.msg);
				} else {
					toast.success(data.msg);
				}
			})
			.finally(() => setIsLoading(false));
	};

	const handleBack = () => {
		navigate("/profile", { replace: true });
	};

	useEffect(() => {
		if (token) {
			GetInfo().then(({ data }) => {
				if (~data.code) {
					setUser(data.data);
					setProfile(data.data);
					setAvatarPreview(data.data.avatar);
				} else {
					setToken("");
					toast.error(data.msg);
				}
			});
		}
	}, []); // eslint-disable-line

	return (
		<div className="min-h-screen bg-gray-50 py-8 px-4">
			<div className="max-w-2xl mx-auto">
				<Card>
					<Box>
						<Flex align="center" gap="2">
							<User className="h-5 w-5" />
							编辑个人资料
						</Flex>
						<Text size="1">更新您的个人信息和头像</Text>
					</Box>
					<Box>
						<form onSubmit={handleSubmit} className="space-y-6">
							{/* 头像上传区域 */}
							<Flex
								direction="column"
								align="center"
								className="space-y-4"
							>
								<div className="relative group">
									<Avatar
										className="h-24 w-24"
										src={avatarPreview}
										alt="用户头像"
										fallback={
											<User className="h-24 w-24" />
										}
									/>
								</div>
								<Flex align="center" direction="column">
									<label
										htmlFor="avatar-upload"
										className="cursor-pointer text-sm text-blue-600 hover:text-blue-700 flex items-center gap-2"
									>
										<Upload className="h-4 w-4" />
										更换头像
									</label>
									<input
										id="avatar-upload"
										type="file"
										accept="image/*"
										onChange={handleAvatarChange}
										className="hidden"
									/>
									<p className="text-xs text-gray-500 mt-1">
										支持 JPG、PNG 格式，最大 5MB
									</p>
								</Flex>
							</Flex>

							{/* 基本信息 */}
							<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
								<div className="space-y-2">
									<label
										htmlFor="username"
										className="flex items-center gap-2"
									>
										<User className="h-4 w-4" />
										用户名
									</label>
									<TextField.Root
										id="username"
										value={profile.username}
										onChange={(e) =>
											handleInputChange(
												"username",
												e.target.value
											)
										}
										placeholder="请输入用户名"
										required
										disabled
									/>
								</div>

								<div className="space-y-2">
									<label
										htmlFor="nickname"
										className="flex items-center gap-2"
									>
										<User className="h-4 w-4" />
										昵称
									</label>
									<TextField.Root
										id="nickname"
										value={profile.nickname}
										onChange={(e) =>
											handleInputChange(
												"nickname",
												e.target.value
											)
										}
										placeholder="请输入昵称"
									/>
								</div>
							</div>

							<div className="space-y-2">
								<label
									htmlFor="email"
									className="flex items-center gap-2"
								>
									<Mail className="h-4 w-4" />
									邮箱地址
								</label>
								<TextField.Root
									id="email"
									type="email"
									value={profile.email}
									onChange={(e) =>
										handleInputChange(
											"email",
											e.target.value
										)
									}
									placeholder="请输入邮箱地址"
									required
								/>
							</div>

							{/* 只读信息 */}
							<div className="border-t pt-4">
								<h3 className="text-sm font-medium text-gray-700 mb-3">
									账户信息
								</h3>
								<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
									<div className="space-y-2">
										<label
											htmlFor="id"
											className="flex items-center gap-2"
										>
											<Hash className="h-4 w-4" />
											用户 ID
										</label>
										<TextField.Root
											id="id"
											value={profile.id}
											disabled
											className="bg-gray-50"
										/>
									</div>

									<div className="space-y-2">
										<label
											htmlFor="createdAt"
											className="flex items-center gap-2"
										>
											<Calendar className="h-4 w-4" />
											注册时间
										</label>
										<TextField.Root
											id="createdAt"
											value={new Date(
												profile.createdAt
											).toLocaleString("zh-CN")}
											disabled
											className="bg-gray-50"
										/>
									</div>
								</div>
							</div>

							{/* 操作按钮 */}
							<div className="flex justify-end gap-3 pt-4">
								<Button
									type="button"
									onClick={handleBack}
									disabled={isLoading}
								>
									返回
								</Button>
								<Button
									type="submit"
									mode="primary"
									disabled={isLoading}
									className="min-w-[100px]"
								>
									{isLoading ? (
										<div className="flex items-center gap-2">
											<div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
											保存中...
										</div>
									) : (
										<div className="flex items-center gap-2">
											<Save className="h-4 w-4" />
											保存更改
										</div>
									)}
								</Button>
							</div>
						</form>
					</Box>
				</Card>

				{/* 提示信息 */}
				<Card className="mt-4">
					<Flex className="pt-4">
						<div className="text-sm text-gray-600 space-y-1">
							<p>• 用户名和邮箱为必填项</p>
							<p>• 头像会自动裁剪为圆形显示</p>
						</div>
					</Flex>
				</Card>
			</div>
		</div>
	);
}
