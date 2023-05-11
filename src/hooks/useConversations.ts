import { axios } from "@/lib/axios";
import { queryClient } from "@/lib/react-query";
import { Conversation } from "@/types/Conversation";
import { User } from "@/types/User";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "./useAuth";

const getConversations = async (query?: string) => {
    let params = {} as any;

    if (query && query !== "") params["search"] = query;

    const {
        data: { data },
    } = await axios.get("/conversations", { params });

    return data as Conversation[];
};

type UseConversationOptions = {
    select?: (data: any) => any;
    query?: string;
};

export const useConversations = ({ select, query }: UseConversationOptions) => {
    const { data: user } = useAuth();
    const queryKey = ["conversations", query || ""];

    return useQuery(queryKey, () => getConversations(query), {
        select: (data) => {
            const modifiedData = data.map((conversation) => {
                const to = conversation.members.find((member) => member._id !== user?._id) as User;

                return { ...conversation, to };
            });
            if (select) return select(modifiedData);

            return modifiedData;
        },
    });
};

/**
 * Push the latest conversation on top of the list
 */
export const onConversationUpdate = (conversationId: string, lastMessage: any) => {
    queryClient.setQueryData(["conversations", ""], (prev: any) => {
        console.log(prev);

        const index = prev.findIndex((c: any) => c._id === conversationId);

        if (index !== -1) {
            const latestConversation = prev.splice(index, 1)[0];
            return [{ ...latestConversation, lastMessage }, ...prev];
        } else {
            console.log("not in the list");

            queryClient.invalidateQueries({ queryKey: ["conversations"] });
        }
    });
};
