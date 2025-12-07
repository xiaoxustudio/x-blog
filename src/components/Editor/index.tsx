import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import CharacterCount from "@tiptap/extension-character-count";
import { Bold, Italic, List, ListOrdered, Strikethrough } from "lucide-react";
import { Markdown } from "@tiptap/markdown";
import { Flex, Separator, Text } from "@radix-ui/themes";
import { Toggle } from "../Toggle";
import { useReducer, useState } from "react";
import "./index.css";

interface EditorProps {
	value: string;
	onChange?: (value: string) => void;
	readonly?: boolean;
	maxLength?: number;
	minLength?: number;
}

export default function Editor({
	value,
	onChange,
	readonly = false,
	maxLength,
	minLength = 0
}: EditorProps) {
	const [, forceUpdate] = useReducer((x) => x + 1, 0);
	const [characterCount, setCharacterCount] = useState(0);

	const editor = useEditor({
		extensions: [
			StarterKit,
			Markdown,
			CharacterCount.configure({
				limit: maxLength
			})
		],
		editable: !readonly,
		content: value,
		contentType: "markdown",
		onUpdate: ({ editor }) => {
			onChange?.(editor.getHTML());
			setCharacterCount(editor.storage.characterCount.characters());
		},
		onTransaction: () => {
			if (editor) {
				forceUpdate();
				setCharacterCount(editor.storage.characterCount.characters());
			}
		}
	});

	const isOverMax = maxLength ? characterCount > maxLength : false;
	const isUnderMin = minLength ? characterCount < minLength : false;

	if (!editor) {
		return null;
	}

	return (
		<div className="rounded-md border border-gray-200">
			{!readonly && (
				<Flex
					wrap="wrap"
					gap="1"
					className="border-b border-gray-200 p-2"
				>
					<Toggle
						pressed={editor?.isActive("bold")}
						onPressedChange={() =>
							editor.chain().focus().toggleBold().run()
						}
					>
						<Bold className="h-4 w-4" />
					</Toggle>
					<Toggle
						pressed={editor?.isActive("italic")}
						onPressedChange={() =>
							editor.chain().focus().toggleItalic().run()
						}
					>
						<Italic className="h-4 w-4" />
					</Toggle>
					<Toggle
						pressed={editor?.isActive("strike")}
						onPressedChange={() =>
							editor.chain().focus().toggleStrike().run()
						}
					>
						<Strikethrough className="h-4 w-4" />
					</Toggle>
					<Separator mx="2" my="4" orientation="vertical" />
					<Toggle
						pressed={editor?.isActive("bulletList")}
						onPressedChange={() =>
							editor.chain().focus().toggleBulletList().run()
						}
					>
						<List className="h-4 w-4" />
					</Toggle>
					<Toggle
						pressed={editor?.isActive("orderedList")}
						onPressedChange={() =>
							editor.chain().focus().toggleOrderedList().run()
						}
					>
						<ListOrdered className="h-4 w-4" />
					</Toggle>
				</Flex>
			)}
			<EditorContent editor={editor} data-readonly={readonly} />

			<Flex
				align="center"
				justify="between"
				className=" border-t border-gray-200 p-2"
			>
				<Text size="1" color="gray" as="span">
					{characterCount}
					{maxLength && ` / ${maxLength}`} 字符
				</Text>
				{isOverMax && (
					<Text size="1" color="red" as="span" weight="medium">
						超出最大 {maxLength} 字符
					</Text>
				)}
				{isUnderMin && (
					<Text size="1" color="amber" as="span" weight="medium">
						请输入至少 {minLength} 字符
					</Text>
				)}
			</Flex>
		</div>
	);
}
