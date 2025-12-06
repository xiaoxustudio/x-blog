import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { Separator } from "@/components/ui/separator";
import { Bold, Italic, List, ListOrdered, Strikethrough } from "lucide-react";
import { Toggle } from "@/components/ui/toggle";
import { Markdown } from "@tiptap/markdown";
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
	const editor = useEditor({
		extensions: [StarterKit, Markdown],
		editable: !readonly,
		content: value,
		contentType: "markdown",
		onUpdate: ({ editor }) => {
			onChange?.(editor.getHTML());
		}
	});

	if (!editor) {
		return null;
	}

	return (
		<div className={`rounded-md ${!readonly ? "border" : ""}`}>
			{!readonly && (
				<div className="flex flex-wrap gap-1 p-2 border-b">
					<Toggle
						size="sm"
						pressed={editor.isActive("bold")}
						onPressedChange={() =>
							editor.chain().focus().toggleBold().run()
						}
					>
						<Bold className="h-4 w-4" />
					</Toggle>
					<Toggle
						size="sm"
						pressed={editor.isActive("italic")}
						onPressedChange={() =>
							editor.chain().focus().toggleItalic().run()
						}
					>
						<Italic className="h-4 w-4" />
					</Toggle>
					<Toggle
						size="sm"
						pressed={editor.isActive("strike")}
						onPressedChange={() =>
							editor.chain().focus().toggleStrike().run()
						}
					>
						<Strikethrough className="h-4 w-4" />
					</Toggle>
					<Separator orientation="vertical" className="mx-1 h-7" />
					<Toggle
						size="sm"
						pressed={editor.isActive("bulletList")}
						onPressedChange={() =>
							editor.chain().focus().toggleBulletList().run()
						}
					>
						<List className="h-4 w-4" />
					</Toggle>
					<Toggle
						size="sm"
						pressed={editor.isActive("orderedList")}
						onPressedChange={() =>
							editor.chain().focus().toggleOrderedList().run()
						}
					>
						<ListOrdered className="h-4 w-4" />
					</Toggle>
				</div>
			)}
			<EditorContent editor={editor} data-readonly={readonly} />
		</div>
	);
}
