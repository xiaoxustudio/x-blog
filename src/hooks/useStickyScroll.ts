import { useEffect, useRef, useState } from "react";

const deadZone = -50;

export function useStickyScroll() {
	const [isStuck, setIsStuck] = useState(false);
	const ref = useRef(document.querySelector("body"));

	useEffect(() => {
		const handleScroll = () => {
			if (ref.current) {
				const { top } = ref.current.getBoundingClientRect();
				setIsStuck(top < deadZone);
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
