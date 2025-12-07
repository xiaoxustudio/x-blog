import { BookOpen, FolderOpen, Home, Search, User } from "lucide-react";
import { Link } from "react-router-dom";
import useUser from "@/store/user";
import { TextField } from "@radix-ui/themes";

export function Header() {
	const { token } = useUser();

	return (
		<header className="bg-background/95 supports-backdrop-filter:bg-background/60 sticky top-0 z-50 w-full backdrop-blur">
			<div className="container flex h-16 items-center justify-between">
				{/* Logo */}
				<Link to="/" className="pl-35 text-2xl font-bold">
					X Blog
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
					<div className="relative">
						<TextField.Root
							placeholder="搜索文章..."
							className="w-64 pl-8"
						>
							<TextField.Slot>
								<Search className="text-muted-foreground h-4 w-4" />
							</TextField.Slot>
						</TextField.Root>
					</div>
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
