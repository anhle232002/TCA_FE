import { useConversation } from "@/hooks/useConversation";
import React from "react";
import { useLocation } from "react-router-dom";
import { ConversationContent } from "./conversation-content";
import { ConversationHeader } from "./conversation-header";
import { NoSelectedConversation } from "./NoSelectedConversation";
import { TypeMessageSection } from "./type-message-section";

interface Props {}

export const Conversation: React.FC<Props> = () => {
    const location = useLocation();
    const { data, isLoading } = useConversation()!;

    console.log(data);

    if (isLoading) return <div>Loading...</div>;

    if (!data?.user && !isLoading)
        return (
            <div className="text-center text-2xl text-accent dark:text-dark__accent">
                User you found does not exist
            </div>
        );

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
