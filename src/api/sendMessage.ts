import { useSocket } from "@/context/socketioProvider";
import { queryClient } from "@/lib/react-query";
import { Message } from "@/types/Message";
import { getRandomId } from "@/utils/randomId";
import { useMutation } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

export const useSendMessage = (conversationId: string) => {
    const { sendMessage } = useSocket();
    const params = useParams();

    return useMutation({
        mutationFn: sendMessage,
        onSuccess(data, variables, context) {
            queryClient.setQueryData(["conversation", "messages", conversationId], (prev: any) => {
                const newMessages = [
                    ...prev,
                    { ...data, _id: getRandomId().toString() } as Message,
                ];
                return newMessages;
            });
        },
    });
};
