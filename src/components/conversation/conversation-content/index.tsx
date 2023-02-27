import { useConversation } from "@/hooks/useConversation";
import { useMessages } from "@/hooks/useMessages";
import { useAppStore } from "@/stores/AppStore";
import React, { useEffect, useRef } from "react";
import { Message } from "../message";

interface Props {}

export const ConversationContent: React.FC<Props> = () => {
    const { isAuthUser } = useAppStore();
    const { data } = useConversation()!;
    const { data: messages, isLoading } = useMessages(data?.conversation?._id);
    const scrollToBottomRef = useRef<HTMLDivElement>(null);
    const messagesContainer = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (scrollToBottomRef.current && messages) {
            scrollToBottomRef.current?.scrollIntoView();
        }
    }, [messages]);

    useEffect(() => {
        messagesContainer.current?.addEventListener("scroll", (e) => {
            if (messagesContainer.current?.scrollTop === 0 && !isLoading) {
            }
        });
    }, []);

    // Auth user has not had conversation with this user
    if (!data?.conversation) {
        return (
            <div className="mt-4 py-4 space-y-4 flex-1 overflow-auto center">
                <div className="text-lg text-accent dark:text-dark__accent italic">
                    You two haven't talk to each other . Send a message to start conversation
                </div>
            </div>
        );
    }

    if (isLoading) return <div>Is loading....</div>;

    return (
        <>
            <div ref={messagesContainer} className="mt-4 py-4 space-y-4 flex-1 overflow-auto">
                {messages!.map((message) => {
                    return (
                        <Message key={message._id} {...message} isMe={isAuthUser(message.from)} />
                    );
                })}
                <div ref={scrollToBottomRef}></div>
            </div>
        </>
    );
};
