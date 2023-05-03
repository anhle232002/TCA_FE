import React, { ReactNode } from "react";
import { useLocation } from "react-router-dom";
import { ConversationPreview } from ".";

interface Props {
    header: string;
    subheader: string;
    link: string;
    image: string;
}

export const ChatsConversationPreview: React.FC<Props> = (props) => {
    const location = useLocation().pathname;

    const isSelectedConversation = location === props.link;
    return (
        <div
            className={`relative border-b dark:border-b-dark__accent-content last:border-none
         before:w-1 before:h-full ${
             isSelectedConversation && "before:bg-primary"
         } before:absolute before:left-0 before:top-0`}
        >
            <ConversationPreview {...props} />
        </div>
    );
};
