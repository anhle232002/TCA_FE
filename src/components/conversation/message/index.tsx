import { useTranslateMessage } from "@/api/translateMessage";
import { Message as TMessage } from "@/types/Message";
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
    shouldTranslate,
}) => {
    const { mutateAsync, isLoading } = useTranslateMessage(_id!, conversationId);
    const showTranslateMessage = translatedBody && !isLoading;

    useEffect(() => {
        if (!translatedBody && shouldTranslate) {
            mutateAsync({ messages: [body], from: "en", to: "fr" });
        }
    }, []);

    return (
        <div className={`flex py-2 ${isMe ? "justify-end" : ""}`}>
            <div>
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

                {!isMe && showTranslateMessage && (
                    <p
                        className="px-6 py-3 rounded-md shadow-sm md:text-sm text-xs lg:max-w-4xl md:max-w-lg max-w-xs
                    bg-secondary dark:bg-dark__secondary text-accent dark:text-dark__accent"
                    >
                        {translatedBody}
                    </p>
                )}
                {!showTranslateMessage && !isMe && <div>Translating...</div>}
                <div className={`mt-2 text-xs text-gray-500 ${isMe ? "text-end" : ""}`}>
                    01:35 PM
                </div>
            </div>
        </div>
    );
};
