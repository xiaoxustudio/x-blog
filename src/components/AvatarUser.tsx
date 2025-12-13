import type { IUser } from "@/types";
import { Avatar } from "@radix-ui/themes";

function AvatarUser({ user }: { user: IUser | null | undefined }) {
	const avatarFallback = user?.nickname
		? user?.nickname.charAt(0).toUpperCase()
		: user?.username.charAt(0).toUpperCase();
	return (
		<>
			{user ? (
				<Avatar
					className="h-16 w-16 mr-4"
					src={user?.avatar}
					alt={user?.nickname || user?.username}
					fallback={avatarFallback!}
				/>
			) : (
				<Avatar className="h-16 w-16 mr-4" fallback="无头像" />
			)}
		</>
	);
}

export default AvatarUser;
