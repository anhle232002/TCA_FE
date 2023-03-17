import { ConversationPreview } from "@/components/conversation-preview";
import { ChatsConversationPreview } from "@/components/conversation-preview/ChatsConversationPreview";
import { useAuth } from "@/hooks/useAuth";
import { useConversations } from "@/hooks/useConversations";
import { useAppStore } from "@/stores/AppStore";
import { Conversation } from "@/types/Conversation";
import React, { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { BaseTab } from "../base-tab";
import { SearchBar } from "../SearchBar";

interface Props {}

export const Chats: React.FC<Props> = () => {
    const { selectTab } = useAppStore();
    const { data } = useConversations({
        select: (conversations: any) => {
            return conversations?.map((conversation: any) => {
                return {
                    link: `/messages/${conversation.to._id}`,
                    header: conversation.to.fullName,
                    subheader: "Last message",
                    image: conversation.to.avatar,
                };
            });
        },
    });

    return (
        <BaseTab datalist={data} Component={ChatsConversationPreview}>
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
                    <SearchBar placeholder="Search chats..." />
                </div>
            </header>
        </BaseTab>
    );
};
