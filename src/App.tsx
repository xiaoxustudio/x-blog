import { Toaster } from "sonner";
import { BrowserRouter as Router, Routes, Route } from "react-router";

import { Header } from "./components/Header";
import { Footer } from "./components/Footer";

import ArticlesPage from "./pages/ArticlesPage";
import CategoriesPage from "./pages/CategoriesPage";
import ArticleDetailPage from "./pages/ArticleDetailPage";
import ProfilePage from "./pages/user/ProfilePage";
import ProfileEditPage from "./pages/user/EditePage";
import ArticlePublishPage from "./pages/publish";
import MyArticles from "./pages/user/MyArticles";
import HomeList from "./components/HomeList";
import TheLogin from "./pages/user/TheLogin";
import TheRegister from "./pages/user/TheRegister";

function App() {
	return (
		<Router>
			<div className="bg-background min-h-screen">
				<Header />
				<main>
					<Routes>
						<Route path="/" element={<HomeList />} />

						<Route path="/articles" element={<ArticlesPage />} />
						<Route
							path="/publish"
							element={<ArticlePublishPage />}
						/>

						<Route
							path="/categories"
							element={<CategoriesPage />}
						/>

						<Route path="/login" element={<TheLogin />} />
						<Route path="/register" element={<TheRegister />} />
						<Route path="/profile" element={<ProfilePage />} />
						<Route path="/edit" element={<ProfileEditPage />} />
						<Route path="/myposts" element={<MyArticles />} />

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
