import { axios } from "@/lib/axios";
import { Conversation } from "@/types/Conversation";
import { User } from "@/types/User";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "./useAuth";

const getConversations = async () => {
    const {
        data: { data },
    } = await axios.get("/conversations");

    return data as Conversation[];
};

export const useConversations = () => {
    const { data: user } = useAuth();
    return useQuery(["conversations"], getConversations, {
        select(data) {
            return data.map((conversation) => {
                const to = conversation.members.find((member) => member._id !== user?._id) as User;

                return { ...conversation, to };
            });
        },
    });
};
