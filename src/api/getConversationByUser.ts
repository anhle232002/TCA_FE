import { axios } from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";

/**
 *
 * @param userId id of user whom have conversation with auth user
 */
const getConversationByMembers = async (userId: string) => {
    try {
        const { data } = await axios.get(`/conversations/users/${userId}`);
        console.log(data);
    } catch (error) {
        console.log(error);
    }
};

export const useConversationByUser = (userId: string) => {
    return useQuery(["conversations", "users", userId], () => getConversationByMembers(userId));
};
