import type { IComment } from "@/types";
import { Box, Flex, Heading, ScrollArea, Text } from "@radix-ui/themes";
import AvatarUser from "./AvatarUser";
import useUser from "@/store/user";

interface Props {
	comment: IComment;
}

function Comment({ comment }: Props) {
	const { user } = useUser();
	return (
		<Flex
			justify="between"
			gap="2"
			className="my-2 border-b border-gray-200 w-full"
		>
			<Flex>
				<AvatarUser user={user} />
				<Heading size="1">{comment.userId}</Heading>
			</Flex>
			<Flex justify="between" className="w-full">
				<ScrollArea className="h-20! w-full" scrollbars="vertical">
					<Box
						className="text-xs"
						dangerouslySetInnerHTML={{
							__html: comment.content.replace(/\n/g, "<br/>")
						}}
					></Box>
				</ScrollArea>
				<Flex justify="between">
					<Text size="1" className="text-gray-500">
						{comment.createdAt}
					</Text>
				</Flex>
			</Flex>
		</Flex>
	);
}
export default Comment;
