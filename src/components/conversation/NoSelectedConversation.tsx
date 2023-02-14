import React from "react";

interface Props {}

export const NoSelectedConversation: React.FC<Props> = () => {
    return (
        <div
            className="flex-1 flex items-center justify-center text-xl
         tracking-wide opacity-50 dark:text-dark__accent"
        >
            <div className="text-center">
                <div>
                    <i className="ri-question-answer-line text-9xl"></i>
                </div>
                <p>Select a conversation to starting...</p>
            </div>
        </div>
    );
};
