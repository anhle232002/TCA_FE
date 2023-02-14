import { useAuth } from "@/hooks/useAuth";
import { useConversation } from "@/hooks/useConversation";
import { useAppStore } from "@/stores/AppStore";
import React from "react";
import { useLocation } from "react-router-dom";
import { Message } from "../message";

interface Props {}

export const ConversationContent: React.FC<Props> = () => {
    const { isAuthUser } = useAppStore();
    const location = useLocation();
    const { data } = useConversation()!;

    // Auth user has not had conversation with this user
    if (location.pathname.includes("user") && !data?.conversation) {
        return (
            <div className="mt-4 py-4 space-y-4 flex-1 overflow-auto center">
                <div className="text-lg text-accent dark:text-dark__accent italic">
                    You two haven't talk to each other . Send a message to start conversation
                </div>
            </div>
        );
    }

    return (
        <div className="mt-4 py-4 space-y-4 flex-1 overflow-auto">
            {data?.messages!.map((message) => {
                return <Message key={message._id} {...message} isMe={isAuthUser(message.from)} />;
            })}
        </div>
    );
};
