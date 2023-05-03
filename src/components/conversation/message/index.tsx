import { useTranslateMessage } from "@/api/translateMessage";
import { LoadingDots } from "@/components/loading-dots";
import { useAuth } from "@/hooks/useAuth";
import { Message as TMessage } from "@/types/Message";
import { motion } from "framer-motion";
import React, { useEffect } from "react";

interface Props extends TMessage {
    isMe?: boolean;
}

export const Message: React.FC<Props> = ({
    _id,
    conversationId,
    body,
    isMe = false,
    translatedBody,
    isNewMessage,
}) => {
    const { mutateAsync, isLoading } = useTranslateMessage(_id!, conversationId);
    const { data: user } = useAuth();

    useEffect(() => {
        if (!translatedBody && isNewMessage && !isMe) {
            mutateAsync({ messages: [body], from: "auto", to: user?.language! || "en" });
        }
    }, []);
    return (
        <motion.div
            initial={
                isNewMessage && {
                    translateY: 30,
                    translateX: isMe ? 10 : -10,
                }
            }
            animate={{
                translateY: 0,
                translateX: 0,
            }}
            transition={{ duration: 0.6, type: "spring" }}
        >
            <div className={`flex ${isMe ? "justify-end" : ""}`}>
                <p
                    className={` px-6 py-3 rounded-md shadow-sm md:text-sm text-xs lg:max-w-4xl md:max-w-lg max-w-xs
                    ${
                        isMe
                            ? "bg-primary text-white dark:bg-primary-focus"
                            : "bg-secondary dark:bg-dark__secondary text-accent dark:text-dark__accent"
                    }
                `}
                >
                    {body}
                </p>
            </div>
            {!isMe && (
                <div className={`flex mt-1 ${isMe ? "justify-end" : ""}`}>
                    <TranslatedContent isLoading={isLoading} content={translatedBody} />
                </div>
            )}

            <div className={`mt-2 text-xs text-gray-500 ${isMe ? "text-end" : ""}`}>01:35 PM</div>
        </motion.div>
    );
};

type TranslatedContentProps = {
    content?: string;
    isLoading: boolean;
};

const TranslatedContent = ({ content, isLoading }: TranslatedContentProps) => {
    return (
        <div
            className="bg-secondary dark:bg-dark__secondary text-accent dark:text-dark__accent
         shadow-sm  rounded-md flex items-center overflow-hidden gap-1 lg:max-w-4xl md:max-w-lg max-w-xs h-10"
        >
            <div className="bg-primary h-full center w-8">
                <i className="ri-translate font-semibold text-lg"></i>
            </div>
            {!content || isLoading ? (
                <div className="px-4">
                    <LoadingDots />
                </div>
            ) : (
                <p className="pr-4 pl-2 md:text-sm text-xs flex-1">{content}</p>
            )}
        </div>
    );
};
