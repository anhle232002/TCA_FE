import { ConversationPreview } from "@/components/conversation-preview";
import React, { Component, ComponentType, FunctionComponent, ReactNode } from "react";
import { SearchBar } from "../SearchBar";

interface ConversationProps {
    header: string;
    subheader: string;
}

interface Props {
    datalist?: any[];
    children: ReactNode;
    Component: FunctionComponent<ConversationProps>;
}

export const BaseTab: React.FC<Props> = ({ datalist, children, Component }) => {
    return (
        <div className="bg-secondary flex flex-col dark:bg-dark__secondary h-full w-full rounded shadow-md text-accent dark:text-dark__accent">
            {children}

            <div className="mt-4 flex-1 overflow-y-auto">
                {datalist?.map((item) => {
                    return <Component key={item.header} {...item} />;
                })}

                <ConversationPreview header="Byrom Guittet" subheader="Dental Hygienist" />
            </div>
        </div>
    );
};
