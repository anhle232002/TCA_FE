import { axios } from "@/lib/axios";
import { Conversation } from "@/types/Conversation";
import { useQuery } from "@tanstack/react-query";

const getConversations = async () => {
    const {
        data: { data },
    } = await axios.get("/conversations");

    return data as Conversation[];
};

export const useConversations = () => {
    return useQuery(["conversations"], getConversations);
};
