import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { Bold, Italic, List, ListOrdered, Strikethrough } from "lucide-react";
import { Markdown } from "@tiptap/markdown";
import { Flex, Separator } from "@radix-ui/themes";
import { Toggle } from "../Toggle";
import { useReducer } from "react";
import "./index.css";

interface EditorProps {
	value: string;
	onChange?: (value: string) => void;
	readonly?: boolean;
}

export default function Editor({
	value,
	onChange,
	readonly = false
}: EditorProps) {
	const [, forceUpdate] = useReducer((x) => x + 1, 0);
	const editor = useEditor({
		extensions: [StarterKit, Markdown],
		editable: !readonly,
		content: value,
		contentType: "markdown",
		onUpdate: ({ editor }) => {
			onChange?.(editor.getHTML());
		},
		onSelectionUpdate: () => forceUpdate()
	});

	if (!editor) {
		return null;
	}

	return (
		<div className="rounded-md border border-gray-200">
			{!readonly && (
				<Flex
					wrap="wrap"
					gap="1"
					className="p-2 border-b border-gray-200"
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
		</div>
	);
}
