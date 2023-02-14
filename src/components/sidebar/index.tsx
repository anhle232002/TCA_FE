import { useAppStore } from "@/stores/AppStore";
import React from "react";
import { Chats } from "./chats";
import { People } from "./people";

interface Props {}

export const SideBar: React.FC<Props> = () => {
    const { currentTab } = useAppStore();
    return (
        <div className="p-8 w-[400px] h-full hidden lg:block">
            {(currentTab === "chats" || currentTab === "") && <Chats />}
            {currentTab === "people" && <People />}
        </div>
    );
};

export const MobileSidebar = () => {
    const { currentTab } = useAppStore();
    return (
        <>
            {currentTab !== "" ? (
                <div className="fixed top-0 right-0 h-full md:hidden sm:w-[400px] w-full  block duration-200 ">
                    {currentTab === "chats" && <Chats />}
                    {currentTab === "people" && <People />}
                </div>
            ) : null}
        </>
    );
};
