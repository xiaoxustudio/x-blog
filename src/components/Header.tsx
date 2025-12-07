import { BookOpen, FolderOpen, Home, Search, User } from "lucide-react";
import { Link } from "react-router-dom";
import useUser from "@/store/user";
import { TextField } from "@radix-ui/themes";

export function Header() {
	const { token } = useUser();

	return (
		<header className="sticky top-0 z-50 w-full bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
			<div className="container flex h-16 items-center justify-between">
				{/* Logo */}
				<Link to="/" className="text-2xl font-bold pl-35">
					X Blog
				</Link>

				{/* Desktop Navigation */}
				<nav className="hidden md:flex items-center space-x-6">
					<Link
						to="/"
						className="text-sm font-medium hover:text-primary transition-colors"
					>
						<Home className="mr-1 h-4 w-4 inline" />
						首页
					</Link>
					<Link
						to="/categories"
						className="text-sm font-medium hover:text-primary transition-colors"
					>
						<FolderOpen className="mr-1 h-4 w-4 inline" />
						分类
					</Link>
					<Link
						to="/articles"
						className="flex items-center text-sm font-medium hover:text-primary transition-colors"
					>
						<BookOpen className="mr-1 h-4 w-4 inline" /> 文章
					</Link>
					<Link
						to="/profile"
						className="flex items-center text-sm font-medium hover:text-primary transition-colors"
					>
						<User className="mr-1 h-4 w-4 inline" /> 我的
					</Link>
				</nav>

				{/* Search Bar */}
				<div className="hidden md:flex items-center space-x-2">
					<div className="relative">
						<TextField.Root
							placeholder="搜索文章..."
							className="pl-8 w-64"
						>
							<TextField.Slot>
								<Search className=" h-4 w-4 text-muted-foreground" />
							</TextField.Slot>
						</TextField.Root>
					</div>
				</div>

				{token && (
					<Link
						to="/publish"
						className="flex items-center text-sm font-medium hover:text-primary transition-colors"
					>
						发布文章
					</Link>
				)}
			</div>
		</header>
	);
}
