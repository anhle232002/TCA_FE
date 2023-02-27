import { useTranslateMessages } from "@/api/translateMessage";
import { axios } from "@/lib/axios";
import { Message } from "@/types/Message";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "./useAuth";

const getMesssages = async (conversationId: string, page: number = 1) => {
    const { data } = await axios.get(`/conversations/${conversationId}?page=${page}`);

    return data.messages as Message[];
};

export const useMessages = (conversationId?: string, page: number = 1) => {
    const { data: user } = useAuth();
    const translateMessage = useTranslateMessages(conversationId!);
    return useQuery(
        ["conversation", "messages", conversationId],
        () => getMesssages(conversationId!, page),
        {
            enabled: !!conversationId, // only fetch if there is a conversation id
            select(data) {
                const messages = data?.map((m) => ({
                    ...m,
                    shouldTranslate: m.shouldTranslate || false,
                }));

                return messages;
            },
            async onSuccess(data) {
                if (data && data.every((m) => !m.translatedBody)) {
                    console.log("user language is ", user?.language);
                    const messageBodys = data.map((m) => m.body);
                    await translateMessage.mutateAsync({
                        messages: messageBodys,
                        from: "auto",
                        to: user?.language! || "en",
                    });
                    console.log("translating bro");
                }
            },
        }
    );
};
