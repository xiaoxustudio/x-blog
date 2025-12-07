import { useState, useRef, useEffect, useCallback } from "react";

/**
 * 一个用于处理图片拖拽并转换为 Base64 的自定义 Hook。
 * @param onDrop 当图片拖拽并转换成功后的回调函数，接收 Base64 字符串作为参数。
 */
export const useImageDrop = (onDrop: (base64String: string) => void) => {
	const [isDragOver, setIsDragOver] = useState(false);
	const dropRef = useRef<HTMLDivElement | null>(null);

	const handleDragEnter = useCallback((e: DragEvent) => {
		e.preventDefault();
		e.stopPropagation();
		setIsDragOver(true);
	}, []);

	const handleDragLeave = useCallback((e: DragEvent) => {
		e.preventDefault();
		e.stopPropagation();
		setIsDragOver(false);
	}, []);

	const handleDragOver = useCallback((e: DragEvent) => {
		e.preventDefault();
		e.stopPropagation();
	}, []);

	const handleDrop = useCallback(
		(e: DragEvent) => {
			e.preventDefault();
			e.stopPropagation();

			const files = e.dataTransfer?.files;
			if (files && files.length > 0) {
				const file = files[0];
				// 检查文件类型是否为图片
				if (file.type.startsWith("image/")) {
					const reader = new FileReader();
					reader.onload = (event) => {
						onDrop(event.target?.result as string);
					};
					reader.readAsDataURL(file);
				} else {
					// 可以在这里添加错误提示，例如使用 toast
					console.error("拖拽的文件不是图片类型。");
				}
			}
			setIsDragOver(false);
		},
		[onDrop]
	);

	useEffect(() => {
		const element = dropRef.current;
		if (!element) return;

		element.addEventListener("dragenter", handleDragEnter);
		element.addEventListener("dragover", handleDragOver);
		element.addEventListener("dragleave", handleDragLeave);
		element.addEventListener("drop", handleDrop);

		return () => {
			element.removeEventListener("dragenter", handleDragEnter);
			element.removeEventListener("dragover", handleDragOver);
			element.removeEventListener("dragleave", handleDragLeave);
			element.removeEventListener("drop", handleDrop);
		};
	}, [handleDragEnter, handleDragOver, handleDragLeave, handleDrop]);

	return { isDragOver, dropRef };
};
