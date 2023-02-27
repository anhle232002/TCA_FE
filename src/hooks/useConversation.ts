import { useTranslateMessages } from "@/api/translateMessage";
import { axios } from "@/lib/axios";
import { Conversation } from "@/types/Conversation";
import { Message } from "@/types/Message";
import { User } from "@/types/User";
import { getReceiver } from "@/utils/getReceiver";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { useAuth } from "./useAuth";

interface GetConversationResponse {
    user?: User;
    conversation: Conversation | null;
}
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
    const { data: user } = useAuth();
    const params = useParams();
    const userId = params.uid;
    const translateMessage = useTranslateMessages(userId!);

    return useQuery(["conversation", userId], () => getConversationByMembers(userId!));
};
