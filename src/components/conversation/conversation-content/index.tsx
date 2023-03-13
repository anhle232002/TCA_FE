import { useConversation } from "@/hooks/useConversation";
import { useMessages } from "@/hooks/useMessages";
import { useAppStore } from "@/stores/AppStore";
import { is } from "immer/dist/internal";
import React, { useEffect, useRef, useState } from "react";
import { Message } from "../message";

interface Props {}

export const ConversationContent: React.FC<Props> = () => {
    const { isAuthUser } = useAppStore();
    const { data: conversationData } = useConversation()!;
    const { data, isFetching, isFetchingNextPage, hasNextPage, fetchNextPage, isInitialLoading } =
        useMessages(conversationData?.conversation?._id);
    const scrollToBottomRef = useRef<HTMLDivElement>(null);
    const messagesContainer = useRef<HTMLDivElement>(null);
    const [scrollPosition, setScrollPosition] = useState(0);

    const onScrollTop = async (e: any) => {
        if (e.target.scrollTop === 0 && !isFetchingNextPage && hasNextPage) {
            setScrollPosition(e.target.scrollHeight);
            await fetchNextPage();
        }
    };

    /**
     * Scroll down to bottom when loaded and received messages
     */
    useEffect(() => {
        if (scrollToBottomRef.current && data?.pages[0]) {
            scrollToBottomRef.current?.scrollIntoView();
        }
    }, [isInitialLoading, data?.pages[data.pages.length - 1]]);

    /**
     *  maintain scroll height when loaded next page
     */
    useEffect(() => {
        const scrollTop = messagesContainer.current?.scrollHeight! - scrollPosition;
        if (messagesContainer.current && scrollTop !== 0)
            messagesContainer.current.scrollTop = scrollTop;

        setScrollPosition(messagesContainer.current?.scrollHeight!);
    }, [isFetchingNextPage]);

    // Auth user has not had conversation with this user
    if (!conversationData?.conversation) {
        return (
            <div className="mt-4 py-4 space-y-4 flex-1 overflow-auto center">
                <div className="text-lg text-accent dark:text-dark__accent italic">
                    You two haven't talk to each other . Send a message to start conversation
                </div>
            </div>
        );
    }

    if (isFetching && !isFetchingNextPage) return <div>Is loading....</div>;

    return (
        <>
            <div
                onScroll={onScrollTop}
                ref={messagesContainer}
                className="mt-4 py-4 space-y-4 flex-1 overflow-auto"
            >
                {data?.pages.map((page) => {
                    return page.messages.map((message) => {
                        return (
                            <Message
                                key={message._id}
                                {...message}
                                isMe={isAuthUser(message.from)}
                            />
                        );
                    });
                })}
                <div ref={scrollToBottomRef}></div>
            </div>
        </>
    );
};
