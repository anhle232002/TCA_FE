import { axios } from "@/lib/axios";
import { useAppStore } from "@/stores/AppStore";
import { Conversation } from "@/types/Conversation";
import { Message } from "@/types/Message";
import { User } from "@/types/User";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

const CONVERSATION_TYPE = {
    savedConversation: "SAVED_CONVERSATION",
    conversationWithUser: "CONVERSATION_WITH_USER",
};

interface GetConversationResponse {
    user?: User;
    conversation: Conversation | null;
    messages: Message[] | null;
}

const getConversation = async (conversationId: string) => {
    if (conversationId === "") return null;

    const { data } = await axios.get(`/conversations/${conversationId}`);

    return data as GetConversationResponse;
};

/**
 *
 * @param userId id of user whom have conversation with auth user
 */
const getConversationByMembers = async (userId: string) => {
    try {
        const { data } = await axios.get(`/conversations/users/${userId}`);

        return data as GetConversationResponse;
    } catch (error) {
        console.log(error);
    }
};

export const useConversation = () => {
    const params = useParams();
    const conversationId = params.cid;
    const userId = params.uid || "";

    if (conversationId)
        return useQuery(
            ["conversation", conversationId],
            () => getConversation(conversationId),
            {}
        );

    if (userId)
        return useQuery(
            ["conversation", "user", userId],
            () => getConversationByMembers(userId),
            {}
        );

    return null;
};
