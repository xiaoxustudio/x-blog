import { Button } from "@/components/Button";
import type { TagMetadata } from "@/types";
import { CheckboxCards, Dialog, Flex, ScrollArea } from "@radix-ui/themes";
import { useState, type ReactElement } from "react";

interface TagsDialogProps {
	trigger: ReactElement;
	tags: TagMetadata[];
	selectData?: string[];
	onChange?: (tags: string[]) => void;
}

function TagsDialog({ trigger, tags, selectData, onChange }: TagsDialogProps) {
	const [cacheSelectData, setCacheSelectData] = useState<string[]>(
		selectData ?? []
	);
	return (
		<Dialog.Root>
			<Dialog.Trigger>{trigger}</Dialog.Trigger>

			<Dialog.Content maxWidth="450px">
				<Dialog.Title>添加标签</Dialog.Title>
				<Dialog.Description></Dialog.Description>

				<ScrollArea style={{ height: "300px" }}>
					<Flex direction="column" gap="3">
						{
							// eslint-disable-next-line @typescript-eslint/ban-ts-comment
							// @ts-expect-error
							<CheckboxCards.Root
								defaultValue={selectData}
								columns="3"
								size="1"
								onValueChange={(value) =>
									setCacheSelectData(value)
								}
							>
								{tags.map((item) => (
									<CheckboxCards.Item
										key={item.name}
										value={item.name}
									>
										{item.name}
									</CheckboxCards.Item>
								))}
							</CheckboxCards.Root>
						}
					</Flex>
				</ScrollArea>

				<Flex gap="3" mt="4" justify="end">
					<Dialog.Close>
						<Button variant="soft" color="gray">
							关闭
						</Button>
					</Dialog.Close>
					<Dialog.Close>
						<Button
							mode="primary"
							onClick={() => onChange?.(cacheSelectData)}
						>
							添加
						</Button>
					</Dialog.Close>
				</Flex>
			</Dialog.Content>
		</Dialog.Root>
	);
}

export default TagsDialog;
