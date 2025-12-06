import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
	BookOpen,
	FolderOpen,
	Home,
	Menu,
	Search,
	User,
	X
} from "lucide-react";
import { Link } from "react-router-dom";
import useUser from "@/store/user";

export function Header() {
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const { token } = useUser();

	return (
		<header className="sticky top-0 z-50 w-full bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
			<div className="container flex h-16 items-center justify-between">
				{/* Logo */}
				<Link to="/" className="text-2xl font-bold pl-35">
					My Blog
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
						<Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
						<Input
							placeholder="搜索文章..."
							className="pl-8 w-64"
						/>
					</div>
				</div>

				<Button
					variant="ghost"
					size="icon"
					className="md:hidden"
					onClick={() => setIsMenuOpen(!isMenuOpen)}
				>
					{isMenuOpen ? (
						<X className="h-5 w-5" />
					) : (
						<Menu className="h-5 w-5" />
					)}
				</Button>

				{token && (
					<Link
						to="/publish"
						className="flex items-center text-sm font-medium hover:text-primary transition-colors"
					>
						发布文章
					</Link>
				)}
			</div>

			{/* Mobile Navigation */}
			{isMenuOpen && (
				<div className="md:hidden border-t bg-background">
					<nav className="container flex flex-col space-y-3 p-4">
						<a
							href="#"
							className="text-sm font-medium hover:text-primary"
						>
							首页
						</a>
						<a
							href="#"
							className="text-sm font-medium hover:text-primary"
						>
							文章
						</a>
						<a
							href="#"
							className="text-sm font-medium hover:text-primary"
						>
							关于
						</a>
						<a
							href="#"
							className="text-sm font-medium hover:text-primary"
						>
							联系
						</a>
						<div className="relative pt-2">
							<Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
							<Input placeholder="搜索文章..." className="pl-8" />
						</div>
					</nav>
				</div>
			)}
		</header>
	);
}
