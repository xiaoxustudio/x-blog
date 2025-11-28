import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { FeaturedPost } from "./components/FeaturedPost";
import { PostCard } from "./components/PostCard";
import { Footer } from "./components/Footer";
import { postsData } from "./data/posts";

// 引入页面组件
import ArticlesPage from "./pages/ArticlesPage";
import CategoriesPage from "./pages/CategoriesPage";
import ArticleDetailPage from "./pages/ArticleDetailPage";

// 创建一个简单的“我的”页面占位符
const ProfilePage = () => (
	<div className="container mx-auto px-4 py-12">
		<h1 className="text-4xl font-bold">我的主页</h1>
		<p className="mt-4 text-muted-foreground">
			这里可以显示个人信息、设置等。
		</p>
	</div>
);

// ... 筛选逻辑保持不变 ...
const featuredPosts = postsData.filter((post) => post.featured);
const regularPosts = postsData.filter((post) => !post.featured);

function App() {
	return (
		<Router>
			<div className="min-h-screen bg-background">
				<Header />
				<main>
					<Routes>
						{/* 首页路由 */}
						<Route
							path="/"
							element={
								<>
									<Hero />
									{/* ... 首页内容 ... */}
									<section className="py-12 md:py-24">
										<div className="container mx-auto px-4">
											<h2 className="text-3xl font-bold tracking-tight mb-8">
												精选文章
											</h2>
											<div className="grid gap-8">
												{featuredPosts.map((post) => (
													<FeaturedPost
														key={post.id}
														post={post}
													/>
												))}
											</div>
										</div>
									</section>

									<section className="py-12 md:py-24 bg-muted/50">
										<div className="container mx-auto px-4">
											<h2 className="text-3xl font-bold tracking-tight mb-8">
												最新文章
											</h2>
											<div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
												{regularPosts
													.slice(0, 3)
													.map((post) => (
														<PostCard
															key={post.id}
															post={post}
														/>
													))}
											</div>
										</div>
									</section>
								</>
							}
						/>

						{/* 文章列表页路由 */}
						<Route path="/articles" element={<ArticlesPage />} />

						{/* 分类页路由 */}
						<Route
							path="/categories"
							element={<CategoriesPage />}
						/>

						{/* 我的页面路由 */}
						<Route path="/profile" element={<ProfilePage />} />

						{/* 文章详情页动态路由 */}
						<Route
							path="/articles/:id"
							element={<ArticleDetailPage />}
						/>
					</Routes>
				</main>
				<Footer />
			</div>
		</Router>
	);
}

export default App;
