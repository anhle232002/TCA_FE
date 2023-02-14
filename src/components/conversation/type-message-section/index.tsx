import React from "react";

interface Props {}

export const TypeMessageSection: React.FC<Props> = () => {
    return (
        <div
            className="bg-secondary dark:bg-dark__secondary
         dark:text-dark__accent py-3 px-6 rounded shadow flex items-center"
        >
            <div className="flex-1">
                <input
                    type="text"
                    className="outline-none text-sm w-full bg-transparent"
                    placeholder="Write a message..."
                />
            </div>
            <div>
                <button
                    type="button"
                    className="bg-primary w-8 h-8 rounded-full hover:bg-primary-focus duration-100 active:scale-90"
                >
                    <i className="ri-send-plane-line text-lg text-white"></i>
                </button>
            </div>
        </div>
    );
};
