import { toast, Toaster } from "sonner";
import { BrowserRouter as Router, Routes, Route } from "react-router";

import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { FeaturedPost } from "./components/FeaturedPost";
import { PostCard } from "./components/PostCard";
import { Footer } from "./components/Footer";

import ArticlesPage from "./pages/ArticlesPage";
import CategoriesPage from "./pages/CategoriesPage";
import ArticleDetailPage from "./pages/ArticleDetailPage";
import ProfilePage from "./pages/user/ProfilePage";
import ProfileEditPage from "./pages/user/EditePage";
import ArticlePublishPage from "./pages/publish";
import GetPosts from "./apis/common/posts";
import { useEffect, useMemo } from "react";
import usePostsStore from "./store/posts";

function App() {
	const { setPosts, posts } = usePostsStore();
	const featuredPosts = useMemo(
		() => posts.filter((post) => post.featured),
		[posts]
	);
	const regularPosts = useMemo(
		() => posts.filter((post) => !post.featured),
		[posts]
	);

	useEffect(() => {
		GetPosts().then(({ data }) => {
			if (~data.code) {
				setPosts(data.data);
			} else {
				toast.error(data.msg);
			}
		});
	}, []); // eslint-disable-line react-hooks/exhaustive-deps

	return (
		<Router>
			<div className="bg-background min-h-screen">
				<Header />
				<main>
					<Routes>
						<Route
							path="/"
							element={
								<>
									<Hero />
									<section className="py-12 md:py-24">
										<div className="container mx-auto px-4">
											<h2 className="mb-8 text-3xl font-bold tracking-tight">
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

									<section className="bg-muted/50 py-12 md:py-24">
										<div className="container mx-auto px-4">
											<h2 className="mb-8 text-3xl font-bold tracking-tight">
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

						<Route path="/articles" element={<ArticlesPage />} />
						<Route
							path="/publish"
							element={<ArticlePublishPage />}
						/>

						<Route
							path="/categories"
							element={<CategoriesPage />}
						/>

						<Route path="/profile" element={<ProfilePage />} />
						<Route path="/edit" element={<ProfileEditPage />} />

						<Route
							path="/articles/:id"
							element={<ArticleDetailPage />}
						/>
					</Routes>
				</main>
				<Footer />
				<Toaster />
			</div>
		</Router>
	);
}

export default App;
