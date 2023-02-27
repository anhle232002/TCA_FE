import React from "react";
import { Outlet } from "react-router-dom";
import { Conversation } from "../conversation";
import { NavBar } from "../navbar";
import { MobileSidebar, SideBar } from "../sidebar";

interface Props {}

export const MainLayout: React.FC<Props> = () => {
    return (
        <div className="flex flex-row h-full">
            <NavBar />

            <div>
                <SideBar />

                <MobileSidebar />
            </div>

            <Outlet></Outlet>
        </div>
    );
};
