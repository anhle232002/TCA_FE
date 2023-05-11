import { LoadingSpinner } from "@/components/loading-spinner";
import React, { Component, ComponentType, FunctionComponent, ReactNode } from "react";

interface ConversationProps {
    header: string;
    subheader: string;
    link: string;
    image: string;
}

interface Props {
    datalist?: any[];
    children: ReactNode;
    Component: FunctionComponent<ConversationProps>;
    isLoading: boolean;
}

export const BaseTab: React.FC<Props> = ({ datalist, children, Component, isLoading }) => {
    return (
        <div className="bg-secondary flex flex-col dark:bg-dark__secondary h-full w-full rounded-xl shadow-md text-accent dark:text-dark__accent">
            {children}

            {isLoading ? (
                <LoadingSpinner></LoadingSpinner>
            ) : (
                <div className="mt-4 flex-1 overflow-y-auto">
                    {datalist && datalist.length > 0 ? (
                        datalist?.map((item) => {
                            return <Component key={item.header} {...item} />;
                        })
                    ) : (
                        <div className="text-center ">Empty</div>
                    )}
                </div>
            )}
        </div>
    );
};
