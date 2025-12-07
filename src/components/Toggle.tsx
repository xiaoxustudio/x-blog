import { useState, useCallback, type ComponentProps } from "react";
import { Button } from "./Button";

export interface ToggleProps extends Omit<
	ComponentProps<typeof Button>,
	"onClick"
> {
	/** 控制开关状态 (受控模式) */
	pressed?: boolean;
	/** 状态改变时的回调函数 */
	onPressedChange?: (pressed: boolean) => void;
	/** 初始状态 (非受控模式) */
	defaultPressed?: boolean;
}

export const Toggle = ({
	pressed,
	onPressedChange,
	defaultPressed = false,
	disabled,
	children,
	...props
}: ToggleProps) => {
	const isControlled = pressed !== undefined;

	const [pressedState, setPressedState] = useState(defaultPressed);

	const isPressed = isControlled ? pressed : pressedState;

	const handleToggle = useCallback(() => {
		if (disabled) return;

		const newPressed = !isPressed;

		if (!isControlled) {
			setPressedState(newPressed);
		}

		onPressedChange?.(newPressed);
	}, [isPressed, isControlled, disabled, onPressedChange]);

	return (
		<Button
			variant={isPressed ? "surface" : undefined}
			disabled={disabled}
			onClick={handleToggle}
			aria-pressed={isPressed}
			{...props}
		>
			{children}
		</Button>
	);
};
