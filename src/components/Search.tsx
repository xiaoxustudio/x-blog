import { TextField } from "@radix-ui/themes";
import { Search } from "lucide-react";
import SearchPost from "@/apis/post/search";
import { useRequest } from "ahooks";
import { useMemo, useState } from "react";
import type { Post } from "@/types";
import { cn } from "@/lib/utils";
import { useNavigate } from "react-router";

function SearchInput() {
	const [isFocused, setIsFocused] = useState(false);
	const [keywords, setKeywords] = useState("");

	const navigate = useNavigate();

	const { run, data, loading } = useRequest(SearchPost, {
		debounceWait: 500,
		manual: true
	});

	const list = useMemo<Post[]>(() => {
		const target = data?.data?.data;
		if (Array.isArray(target)) return target;
		return [];
	}, [data]);

	const isVisible = useMemo(() => isFocused, [isFocused]);

	const handleItemClick = (post: Post) => {
		navigate(`/articles/${post.id}`);
	};

	return (
		<div className="relative">
			<TextField.Root
				placeholder="搜索文章..."
				className="w-64 pl-8"
				onInput={(e) => {
					const value = (e.target as HTMLInputElement)?.value;
					run({ kw: value });
					setKeywords(value);
				}}
				onFocus={() => setIsFocused(true)}
				onBlur={() => setIsFocused(false)}
			>
				<TextField.Slot>
					<Search className="text-muted-foreground h-4 w-4" />
				</TextField.Slot>
			</TextField.Root>

			<div
				className={cn(
					"absolute top-full left-0 mt-1 z-10 w-64 bg-white border border-gray-200 rounded-md shadow-md p-2 transition-all duration-200 ease-in-out",
					{
						"opacity-0 pointer-events-none": !isVisible,
						"opacity-100 pointer-events-auto": isVisible
					}
				)}
			>
				{loading && (
					<div className="p-2 text-sm text-gray-500">加载中...</div>
				)}

				{!loading &&
					list.length > 0 &&
					list.map((item: Post) => {
						if (!keywords.trim()) {
							return (
								<div
									key={item.id}
									className="h-8 px-2 flex items-center cursor-pointer rounded-sm hover:bg-gray-100 text-sm"
									onMouseDown={() => handleItemClick(item)}
								>
									{item.title}
								</div>
							);
						}
						const escapedKeywords = keywords.replace(
							/[.*+?^${}()|[\]\\]/g,
							"\\$&"
						);
						const regex = new RegExp(`(${escapedKeywords})`, "i"); // 不区分大小写

						const parts = item.title.split(regex);

						return (
							<div
								key={item.id}
								className=" h-8 px-2 flex items-center cursor-pointer rounded-sm hover:bg-gray-100 text-sm"
								onMouseDown={() => handleItemClick(item)}
							>
								{parts.map((part, index) => {
									if (
										part.toLowerCase() ===
										keywords.toLowerCase()
									) {
										return (
											<span
												key={index}
												className="text-red-500 font-semibold"
											>
												{part}
											</span>
										);
									}
									return <span key={index}>{part}</span>;
								})}
							</div>
						);
					})}

				{!loading && isFocused && list.length === 0 && (
					<div className="p-2 text-sm text-gray-500">无结果</div>
				)}
			</div>
		</div>
	);
}

export default SearchInput;
