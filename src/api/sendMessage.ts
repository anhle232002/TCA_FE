import { useSocket } from "@/context/socketioProvider";
import { useConversation } from "@/hooks/useConversation";
import { onConversationUpdate } from "@/hooks/useConversations";
import { useMessages } from "@/hooks/useMessages";
import { queryClient } from "@/lib/react-query";
import { Message } from "@/types/Message";
import { getRandomId } from "@/utils/randomId";
import { useMutation } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

export const useSendMessage = (conversationId: string) => {
    const { sendMessage } = useSocket();
    const { refetch } = useConversation();
    return useMutation({
        mutationFn: sendMessage,
        onSuccess(data, variables, context) {
            queryClient.setQueryData(["conversation", "messages", conversationId], (prev: any) => {
                if (!conversationId) {
                    return refetch().then(() => {
                        queryClient.invalidateQueries({ queryKey: ["conversations"] });
                    });
                }

                if (!prev) return;

                const message = {
                    ...data,
                    _id: getRandomId().toString(),
                } as Message;

                onConversationUpdate(conversationId, { message, seen: [] });

                message.isNewMessage = true;
                const firstPage = [...prev.pages[0].messages, message];

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
