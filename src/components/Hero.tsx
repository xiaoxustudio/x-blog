import { useNavigate } from "react-router";
import { Button } from "./Button";
import useUser from "@/store/user";

export function Hero() {
	const navigate = useNavigate();
	const { token, user } = useUser();
	return (
		<section className="py-20 text-center md:py-32">
			<div className="container mx-auto px-4">
				<h1 className="text-4xl font-bold tracking-tight md:text-6xl">
					欢迎来到
					<span className="text-primary">X Blog</span>
				</h1>
				<p className="text-muted-foreground mx-auto mt-4 max-w-2xl text-lg">
					在这里，我分享关于前端开发、软件工程和个人成长的思考与见解。希望能与你一同探索技术的无限可能。
				</p>
				<div className="mt-8">
					<Button
						className="mr-4!"
						mode="primary"
						onClick={() => navigate("/articles")}
					>
						浏览文章
					</Button>
					{user && token && (
						<Button onClick={() => navigate("/myposts")}>
							我的文章
						</Button>
					)}
				</div>
			</div>
		</section>
	);
}
