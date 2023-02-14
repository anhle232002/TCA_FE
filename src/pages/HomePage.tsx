import { MainLayout } from "@/components/layouts/MainLayout";
import React from "react";

interface Props {}

const HomePage: React.FC<Props> = () => {
    return (
        <div className="App h-screen max-h-screen overflow-hidden bg-secondary-content dark:bg-dark__secondary-content transition-colors duration-300">
            <MainLayout></MainLayout>
        </div>
    );
};
export default HomePage;
