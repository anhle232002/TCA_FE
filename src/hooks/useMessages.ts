import { useTranslateMessages } from "@/api/translateMessage";
import { axios } from "@/lib/axios";
import { Conversation } from "@/types/Conversation";
import { Message } from "@/types/Message";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { useAuth } from "./useAuth";

type GetMessagesDTO = {
    conversationId: string;
    page: number;
};

type GetMessagesReturn = {
    conversation: Conversation;
    messages: Message[];
    page: number;
};

const getMesssages = async ({ conversationId, page = 1 }: GetMessagesDTO) => {
    const { data } = await axios.get<GetMessagesReturn>(
        `/conversations/${conversationId}?page=${page}`
    );

    return { messages: data.messages, page: data.page };
};

export const useMessages = (conversationId?: string) => {
    const { data: user } = useAuth();
    const translateMessage = useTranslateMessages(conversationId!);
    return useInfiniteQuery({
        enabled: !!conversationId,
        queryFn: ({ pageParam = 1 }) =>
            getMesssages({ conversationId: conversationId!, page: pageParam }),
        queryKey: ["conversation", "messages", conversationId],
        getNextPageParam: (lastPage, allPages) => {
            return lastPage.page &&
                lastPage.messages.length !== 0 &&
                allPages.length !== 0 &&
                lastPage.messages.length === 10
                ? lastPage.page + 1
                : null;
        },
        select: (data) => {
            return {
                pages: data.pages ? [...data.pages].reverse() : [],
                pageParams: data.pageParams ? [...data.pageParams] : [],
            };
        },
        async onSuccess({ pages }) {
            const messages = pages[0].messages;

            if (pages[0] && messages.every((m) => !m.translatedBody)) {
                const messageBodys = messages.map((m) => m.body);
                await translateMessage.mutateAsync({
                    messages: messageBodys,
                    from: "auto",
                    to: user?.language! || "en",
                });
            }
        },
    });
};
