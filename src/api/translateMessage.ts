import { axios } from "@/lib/axios";
import { queryClient } from "@/lib/react-query";
import { IConversation } from "@/types/Conversation";
import { Message } from "@/types/Message";
import { useMutation } from "@tanstack/react-query";

type TranslateMessageDTO = {
    messages: string[];
    from: string;
    to: string;
};

const translateMessages = async ({ messages, from, to }: TranslateMessageDTO) => {
    console.log(messages);

    const { data } = await axios.post("/translate", {
        texts: messages,
        from,
        to,
    });

    return data.texts as string;
};

export const useTranslateMessage = (messageId: string, conversationId: string) => {
    return useMutation({
        mutationFn: translateMessages,
        onSuccess(data, __, _) {
            queryClient.setQueryData(["conversation", "messages", conversationId], (prev: any) => {
                const translatedMessages = prev.map((m: Message) => {
                    if (m._id !== messageId) return m;

                    return {
                        ...m,
                        translatedBody: data[0],
                    };
                });

                return translatedMessages;
            });
        },
    });
};

export const useTranslateMessages = (conversationId: string) => {
    return useMutation({
        mutationFn: translateMessages,
        onSuccess(data, __, _) {
            queryClient.setQueryData(["conversation", "messages", conversationId], (prev: any) => {
                const translatedMessages = (<Message[]>prev).map((m: Message, index: number) => {
                    return { ...m, translatedBody: data[index] };
                });

                return translatedMessages;
            });
        },
    });
};
