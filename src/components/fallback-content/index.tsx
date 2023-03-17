import React from "react";
import { LoadingSpinner } from "../loading-spinner";

interface Props {}

export const Fallback: React.FC<Props> = () => {
    return (
        <div className=" flex-1 py-8 px-6 center ">
            <LoadingSpinner />
        </div>
    );
};
