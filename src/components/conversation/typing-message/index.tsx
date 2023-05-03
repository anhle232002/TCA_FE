import { LoadingDots } from "@/components/loading-dots";
import { motion } from "framer-motion";
import React from "react";

interface Props {}

export const TypingMessage: React.FC<Props> = () => {
    return (
        <div className={`flex`}>
            <p
                className={`rounded-md shadow-sm md:text-sm text-xs pl-4
                bg-secondary dark:bg-dark__secondary text-accent dark:text-dark__accent
                    }
                `}
            >
                <LoadingDots />
            </p>
        </div>
    );
};
