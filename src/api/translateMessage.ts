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

    const {
        data: { texts },
    } = await axios.post("/translate", {
        texts: messages,
        from,
        to,
    });

    const responseData: any[] = [];

    messages.forEach((message, index) => {
        responseData.push({ original: message, translated: texts[index] });
    });

    console.log("response ", responseData);

    return texts as string;
};

export const useTranslateMessage = (messageId: string, conversationId: string) => {
    return useMutation({
        mutationFn: translateMessages,
        onSuccess(data, __, _) {
            queryClient.setQueryData(["conversation", "messages", conversationId], (prev: any) => {
                let firstPage = prev.pages.shift();

                firstPage.messages = firstPage.messages.map((m: Message) => {
                    if (m._id !== messageId) return m;

                    return {
                        ...m,
                        translatedBody: data[0],
                    };
                });

                return { ...prev, pages: [firstPage, ...prev.pages] };
            });
        },
    });
};

export const useTranslateMessages = (conversationId: string, allPages: boolean = false) => {
    return useMutation({
        mutationFn: translateMessages,
        onSuccess(data, __, _) {
            const queryData = queryClient.getQueryData([
                "conversation",
                "messages",
                conversationId,
            ]) as any;

            if (allPages) {
                const messagePerPage = 10;
                <any[]>queryData.pages.forEach((page: any, pageIndex: number) => {
                    page.messages = page.messages.map((m: Message, messageIndex: number) => {
                        return {
                            ...m,
                            translatedBody: data[pageIndex * messagePerPage + messageIndex],
                        };
                    });
                });

                queryClient.setQueryData(["conversation", "messages", conversationId], {
                    ...queryData,
                });
            } else {
                const lastPage = queryData.pages.pop();

                lastPage.messages = lastPage.messages.map((m: Message, index: number) => {
                    return { ...m, translatedBody: data[index] };
                });

                const updatedData = { ...queryData, pages: [...queryData.pages, lastPage] };

                queryClient.setQueryData(["conversation", "messages", conversationId], updatedData);
            }
        },
    });
};
