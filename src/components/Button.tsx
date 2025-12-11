import { cn } from "@/lib/utils";
import { IconButton, Button as RDButton } from "@radix-ui/themes";
import type { ButtonProps as RDButtonProps } from "@radix-ui/themes";

export interface ButtonProps extends Partial<RDButtonProps> {
	mode?: "default" | "primary" | "clear" | "icon";
}

export const Button = ({
	children,
	type = "button",
	mode = "default",
	className,
	...props
}: ButtonProps) => {
	const classNames = cn(
		"transition-colors",
		"duration-400!",
		"ease-in-out!",
		"cursor-pointer!",
		"active:scale-95!",
		"my-2!",
		{
			/* default */
			"bg-black/5!": mode === "default",
			"text-black/70!": ["default", "clear"].includes(mode),
			"hover:bg-black/10!": mode === "default",
			"active:bg-black/15!": mode === "default",
			/* primary */
			"bg-black/80!": mode === "primary",
			"text-white!": mode === "primary",
			"hover:bg-black/90!": mode === "primary",
			"active:bg-black/100!": mode === "primary",
			/* clear */
			"bg-transparent!": mode === "clear",
			"hover:bg-black/5!": mode === "clear",
			"active:bg-black/9!": mode === "clear"
		},
		className
	);
	return (
		<>
			{mode === "icon" ? (
				<IconButton type={type} className={classNames} {...props}>
					{children}
				</IconButton>
			) : (
				<RDButton type={type} className={classNames} {...props}>
					{children}
				</RDButton>
			)}
		</>
	);
};
