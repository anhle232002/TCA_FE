import React, { ReactNode } from "react";
import { ConversationPreview } from ".";

interface Props {
    header: string;
    subheader: string;
    onClick?: () => void;
}

export const ChatsConversationPreview: React.FC<Props> = (props) => {
    return (
        <div className="relative border-b dark:border-b-dark__accent-content last:border-none before:w-1 before:h-full  before:bg-primary before:absolute before:left-0 before:top-0">
            <ConversationPreview {...props} />
        </div>
    );
};
