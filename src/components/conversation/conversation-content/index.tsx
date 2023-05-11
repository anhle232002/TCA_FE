import { useTranslateMessages } from "@/api/translateMessage";
import { LoadingSpinner } from "@/components/loading-spinner";
import { useSocket } from "@/context/socketioProvider";
import { useAuth } from "@/hooks/useAuth";
import { useConversation } from "@/hooks/useConversation";
import { useMessages } from "@/hooks/useMessages";
import { useAppStore } from "@/stores/AppStore";
import { TTypingStatus } from "@/types/Conversation";
import { useQueryClient } from "@tanstack/react-query";
import { AnimatePresence, LayoutGroup, motion } from "framer-motion";
import { is } from "immer/dist/internal";
import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Message } from "../message";
import { TypingMessage } from "../typing-message";

interface Props {}

export const ConversationContent: React.FC<Props> = () => {
    const { isAuthUser } = useAppStore();
    const { data: user } = useAuth();
    const { data: conversationData } = useConversation()!;
    const { data, isFetching, isFetchingNextPage, hasNextPage, fetchNextPage, isInitialLoading } =
        useMessages(conversationData?.conversation?._id);
    const scrollToBottomRef = useRef<HTMLDivElement>(null);
    const messagesContainer = useRef<HTMLDivElement>(null);
    const [scrollPosition, setScrollPosition] = useState(0);
    const [isTyping, setIsTyping] = useState(false);
    const { socket } = useSocket();
    const translateMessagesMutation = useTranslateMessages(
        conversationData?.conversation?._id!,
        true
    );

    const queryClient = useQueryClient();
    console.log("data", data);

    const onScrollTop = async (e: any) => {
        if (e.target.scrollTop === 0 && !isFetchingNextPage && hasNextPage) {
            setScrollPosition(e.target.scrollHeight);
            await fetchNextPage();
        }
    };

    useEffect(() => {
        if (data && data.pages.length !== 0) {
            const queryData = queryClient.getQueryData([
                "conversation",
                "messages",
                conversationData?.conversation?._id!,
            ]) as any;
            const pagesData = queryData.pages
                .map((page: any) => page.messages.map((message: any) => message.body))
                .flat();

            translateMessagesMutation.mutateAsync({
                messages: pagesData,
                from: "auto",
                to: user?.language! || "en",
            });
        }
    }, [user?.language]);

    /**
     * Listening to user typing
     */
    useEffect(() => {
        const onUserTyping = (data: TTypingStatus) => {
            setIsTyping(data.isTyping);
        };

        socket?.on(`typing/${conversationData?.conversation?._id}`, onUserTyping);

        return () => {
            socket?.removeListener(`typing/${conversationData?.conversation?._id}`, onUserTyping);
        };
    }, [conversationData?.conversation?._id]);

    /**
     * Scroll down to bottom when loaded and received messages
     */
    useEffect(() => {
        if (scrollToBottomRef.current && data?.pages[0]) {
            scrollToBottomRef.current?.scrollIntoView();
            setIsTyping(false);
        }
    }, [isInitialLoading, data?.pages[data.pages.length - 1]]);

    useLayoutEffect(() => {
        scrollToBottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [isTyping]);

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

    if (isFetching && !isFetchingNextPage)
        return (
            <div className="flex-1 center">
                <LoadingSpinner />
            </div>
        );

    return (
        <>
            <AnimatePresence initial={false}>
                <motion.div
                    onScroll={onScrollTop}
                    ref={messagesContainer}
                    className="mt-4 py-4 space-y-10 flex-1 overflow-auto overflow-x-hidden relative"
                >
                    <AnimatePresence initial={false}>
                        {data?.pages.map((page) => {
                            return page.messages.map((message) => {
                                return (
                                    <motion.div
                                        key={message._id}
                                        className="relative"
                                        transition={{ duration: 0.2 }}
                                    >
                                        <Message
                                            key={message._id}
                                            {...message}
                                            isMe={isAuthUser(message.from)}
                                        />
                                    </motion.div>
                                );
                            });
                        })}
                        {isTyping && (
                            <motion.div
                                key={"typing-message"}
                                initial={{ translateY: 30, translateX: -10 }}
                                animate={{
                                    translateY: 0,
                                    translateX: 0,
                                }}
                                transition={{ duration: 0.4, type: "spring" }}
                                exit={{
                                    translateY: 0,
                                    translateX: 0,
                                    opacity: 0,
                                    position: "absolute",
                                    height: 0,
                                }}
                            >
                                <TypingMessage />
                            </motion.div>
                        )}

                        <div ref={scrollToBottomRef}></div>
                    </AnimatePresence>
                </motion.div>
            </AnimatePresence>
        </>
    );
};
