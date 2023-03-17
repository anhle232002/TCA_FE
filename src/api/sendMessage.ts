import { useSocket } from "@/context/socketioProvider";
import { queryClient } from "@/lib/react-query";
import { Message } from "@/types/Message";
import { getRandomId } from "@/utils/randomId";
import { useMutation } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

export const useSendMessage = (conversationId: string) => {
    const { sendMessage } = useSocket();

    return useMutation({
        mutationFn: sendMessage,
        onSuccess(data, variables, context) {
            queryClient.setQueryData(["conversation", "messages", conversationId], (prev: any) => {
                const firstPage = [
                    ...prev.pages[0].messages,
                    { ...data, _id: getRandomId().toString(), isNewMessage: true } as Message,
                ];

                prev.pages.shift();

                return { ...prev, pages: [{ messages: firstPage, page: 1 }, ...prev.pages] };
            });
        },
    });
};

export const onReceiveMessage = (message: Message) => {
    const conversationId = message.conversationId;

    queryClient.setQueryData(["conversation", "messages", conversationId], (prev: any) => {
        if (!prev) return prev;
        console.log(message);

        const firstPageMessages = [...prev.pages[0].messages, message];

        const newModifiedFirstPage = { messages: firstPageMessages, page: 1 };

        prev.pages.shift();

        return { ...prev, pages: [newModifiedFirstPage, ...prev.pages] };
    });
};
