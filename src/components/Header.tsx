import { BookOpen, FolderOpen, Home, User } from "lucide-react";
import { Link } from "react-router";
import useUser from "@/store/user";
import { Badge, Flex, Text } from "@radix-ui/themes";
import { useStickyScroll } from "@/hooks/useStickyScroll";
import { cn } from "@/lib/utils";
import SearchInput from "./Search";

export function Header() {
	const { token, user } = useUser();
	const { isStuck } = useStickyScroll();
	const textEllipsis = cn(
		"text-ellipsis overflow-hidden text-nowrap",
		"hover:text-primary text-sm font-medium transition-colors",
		"hover:border-gray-500 hover:border-b-2 border-dashed",
		"border-b-2 border-b-transparent"
	);

	return (
		<header
			className={cn(
				"bg-background/95 supports-backdrop-filter:bg-background/60 sticky top-0 z-50 w-full backdrop-blur-sm",
				{
					"border-gray-300 border-b": isStuck
				}
			)}
		>
			<Flex align="center" justify="between" className="container h-16">
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
					<Link to="/" className={textEllipsis}>
						<Home className="mr-1 inline h-4 w-4" />
						首页
					</Link>
					<Link to="/categories" className={textEllipsis}>
						<FolderOpen className="mr-1 inline h-4 w-4" />
						分类
					</Link>
					<Link to="/articles" className={textEllipsis}>
						<BookOpen className="mr-1 inline h-4 w-4" /> 文章
					</Link>
					<Link to="/profile" className={textEllipsis}>
						<User className="mr-1 inline h-4 w-4" /> 我的
					</Link>
				</nav>

				{/* Search Bar */}
				<div className="hidden items-center space-x-2 md:flex">
					<SearchInput />
				</div>

				{token && (
					<>
						<Flex>
							<User className="mr-1 inline h-4 w-4" />
							<Text className="text-sm font-medium transition-colors">
								{user?.username}
								<Badge color="green" className="ml-1">
									已登录
								</Badge>
							</Text>
						</Flex>
						<Link
							to="/publish"
							className="hover:text-primary flex items-center text-sm font-medium transition-colors"
						>
							发布文章
						</Link>
					</>
				)}
			</Flex>
		</header>
	);
}
