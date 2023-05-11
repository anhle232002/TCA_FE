import { ChatsConversationPreview } from "@/components/conversation-preview/ChatsConversationPreview";
import { useConversations } from "@/hooks/useConversations";
import { useDebounceValue } from "@/hooks/useDebounce";
import { useAppStore } from "@/stores/AppStore";
import React, { useState } from "react";
import { BaseTab } from "../base-tab";
import { SearchBar } from "../SearchBar";

interface Props {}

export const Chats: React.FC<Props> = () => {
    const { selectTab } = useAppStore();
    const [searchTerm, setSearchTerm] = useState("");
    const { debounceValue: searchValue, debouncing } = useDebounceValue(searchTerm, 500);
    const { data } = useConversations({
        select: (conversations: any) => {
            return conversations?.map((conversation: any) => {
                return {
                    link: `/messages/${conversation.to._id}`,
                    header: conversation.to.fullName,
                    subheader: conversation.lastMessage.message.body || "No last message",
                    image: conversation.to.avatar,
                };
            });
        },

        query: searchValue,
    });

    return (
        <BaseTab
            isLoading={debouncing && searchTerm !== ""}
            datalist={data}
            Component={ChatsConversationPreview}
        >
            <header className="py-4 px-3">
                <div className="flex items-center justify-between">
                    <h2 className="tracking-wide text-xl font-semibold">Chats</h2>
                    <div className="lg:hidden block">
                        <button
                            onClick={() => selectTab("")}
                            className="w-8 h-8 text-lg dark:bg-dark__accent-content/20 rounded shadow-md hover:scale-105 duration-200"
                        >
                            <i className="ri-close-line"></i>
                        </button>
                    </div>
                </div>
                <div className="mt-4">
                    <SearchBar
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder="Search chats..."
                    />
                </div>
            </header>
        </BaseTab>
    );
};
