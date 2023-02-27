import { useSendMessage } from "@/api/sendMessage";
import { useSocket } from "@/context/socketioProvider";
import { useAuth } from "@/hooks/useAuth";
import { useConversation } from "@/hooks/useConversation";
import { Message } from "@/types/Message";
import { getReceiver } from "@/utils/getReceiver";
import React, { FormEvent, useState } from "react";

interface Props {}

export const TypeMessageSection: React.FC<Props> = () => {
    const { data: user } = useAuth();
    const { data } = useConversation()!;
    const sendMessageMutation = useSendMessage(data?.conversation?._id!);
    const [messageContent, setMessageContent] = useState("");

    const handleSendMessage = async (e: FormEvent) => {
        try {
            e.preventDefault();

            const message: Message = {
                conversationId: data?.conversation?._id!,
                body: messageContent,
                from: user?._id!,
                to: data?.user?._id!,
                date: Date.now().toString(),
            };

            await sendMessageMutation.mutateAsync(message);

            setMessageContent("");
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <form
            onSubmit={handleSendMessage}
            className="bg-secondary dark:bg-dark__secondary
         dark:text-dark__accent py-3 px-6 rounded shadow flex items-center"
        >
            <div className="flex-1">
                <input
                    type="text"
                    value={messageContent}
                    onChange={(e) => setMessageContent(e.target.value)}
                    className="outline-none text-sm w-full bg-transparent"
                    placeholder="Write a message..."
                />
            </div>
            <div>
                <button
                    type="submit"
                    className="bg-primary w-8 h-8 rounded-full hover:bg-primary-focus duration-100 active:scale-90"
                >
                    <i className="ri-send-plane-line text-lg text-white"></i>
                </button>
            </div>
        </form>
    );
};
