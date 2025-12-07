import { useEffect, useRef, useState } from "react";

export function useStickyScroll() {
	const [isStuck, setIsStuck] = useState(false);
	const ref = useRef<HTMLElement>(document.querySelector("body"));

	useEffect(() => {
		const handleScroll = () => {
			if (ref.current) {
				const { top } = ref.current.getBoundingClientRect();
				setIsStuck(top < -50);
			}
		};

		handleScroll();

		window.addEventListener("scroll", handleScroll);

		return () => {
			window.removeEventListener("scroll", handleScroll);
		};
	}, []);

	return { isStuck };
}
