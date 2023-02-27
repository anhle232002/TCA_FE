import { MainLayout } from "@/components/layouts/MainLayout";
import { NavBar } from "@/components/navbar";
import { MobileSidebar, SideBar } from "@/components/sidebar";
import React from "react";
import { Outlet } from "react-router-dom";

interface Props {}

const HomePage: React.FC<Props> = () => {
    return (
        <div className="App h-screen max-h-screen overflow-hidden bg-secondary-content dark:bg-dark__secondary-content transition-colors duration-300">
            <div className="flex flex-row h-full">
                <NavBar />

                <div>
                    <SideBar />

                    <MobileSidebar />
                </div>

                <Outlet></Outlet>
            </div>
        </div>
    );
};
export default HomePage;
