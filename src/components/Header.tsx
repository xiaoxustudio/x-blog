import { BookOpen, FolderOpen, Home, User } from "lucide-react";
import { Link } from "react-router";
import useUser from "@/store/user";
import { Flex, Text } from "@radix-ui/themes";
import { useStickyScroll } from "@/hooks/useStickyScroll";
import { cn } from "@/lib/utils";
import SearchInput from "./Search";

export function Header() {
	const { token } = useUser();
	const { isStuck } = useStickyScroll();

	return (
		<header
			className={cn(
				"bg-background/95  supports-backdrop-filter:bg-background/60 sticky top-0 z-50 w-full backdrop-blur-sm",
				{
					"border-gray-300 border-b": isStuck
				}
			)}
		>
			<div className="container flex h-16 items-center justify-between">
				{/* Logo */}
				<Link
					to="/"
					className="pl-35 text-2xl font-bold text-shadow-lg text-shadow-white"
				>
					<Flex align="center" className="group">
						<img src="/x.png" width={100} className="z-10" />
						<Text className="text-nowrap text-ellipsis overflow-hidden opacity-0 transition-all duration-500 z-0 transform-[translateX(-120%)] group-hover:transform-[translateX(0%)] group-hover:opacity-100 ">
							X Blog
						</Text>
						<Text
							size="1"
							className="text-nowrap text-ellipsis overflow-hidden opacity-0 transition-all duration-800 z-0 transform-[translateX(100%)] group-hover:transform-[translateX(0%)] group-hover:opacity-100 "
						>
							xuran's
						</Text>
					</Flex>
				</Link>

				{/* Desktop Navigation */}
				<nav className="hidden items-center space-x-6 md:flex">
					<Link
						to="/"
						className="hover:text-primary text-sm font-medium transition-colors"
					>
						<Home className="mr-1 inline h-4 w-4" />
						首页
					</Link>
					<Link
						to="/categories"
						className="hover:text-primary text-sm font-medium transition-colors"
					>
						<FolderOpen className="mr-1 inline h-4 w-4" />
						分类
					</Link>
					<Link
						to="/articles"
						className="hover:text-primary flex items-center text-sm font-medium transition-colors"
					>
						<BookOpen className="mr-1 inline h-4 w-4" /> 文章
					</Link>
					<Link
						to="/profile"
						className="hover:text-primary flex items-center text-sm font-medium transition-colors"
					>
						<User className="mr-1 inline h-4 w-4" /> 我的
					</Link>
				</nav>

				{/* Search Bar */}
				<div className="hidden items-center space-x-2 md:flex">
					<SearchInput />
				</div>

				{token && (
					<Link
						to="/publish"
						className="hover:text-primary flex items-center text-sm font-medium transition-colors"
					>
						发布文章
					</Link>
				)}
			</div>
		</header>
	);
}
