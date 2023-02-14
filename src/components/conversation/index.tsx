import { useConversation } from "@/hooks/useConversation";
import { useAppStore } from "@/stores/AppStore";
import React from "react";
import { useLocation } from "react-router-dom";
import { ConversationContent } from "./conversation-content";
import { ConversationHeader } from "./conversation-header";
import { NoSelectedConversation } from "./NoSelectedConversation";
import { TypeMessageSection } from "./type-message-section";

interface Props {}

export const Conversation: React.FC<Props> = () => {
    const location = useLocation();
    if (location.pathname === "/") return <NoSelectedConversation />;

    return (
        <div className="flex-1 py-8 px-6">
            <div className="flex flex-col  h-full">
                <ConversationHeader />

                <hr className="border-secondary-focus dark:border-dark__secondary/50 mt-6 border" />

                <ConversationContent />

                <hr className="border-secondary-focus dark:border-dark__secondary/50 mt-6 border mb-6" />
                <TypeMessageSection />
            </div>
        </div>
    );
};
