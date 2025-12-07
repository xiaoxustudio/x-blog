import { Button } from "./Button";

export function Hero() {
	return (
		<section className="py-20 md:py-32 text-center">
			<div className="container mx-auto px-4">
				<h1 className="text-4xl md:text-6xl font-bold tracking-tight">
					欢迎来到
					<span className="text-primary">X Blog</span>
				</h1>
				<p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
					在这里，我分享关于前端开发、软件工程和个人成长的思考与见解。希望能与你一同探索技术的无限可能。
				</p>
				<div className="mt-8">
					<Button className="mr-4!" mode="primary">
						浏览文章
					</Button>
					<Button>关于我</Button>
				</div>
			</div>
		</section>
	);
}
