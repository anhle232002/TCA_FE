import React, { ReactNode } from "react";
import logo from "@/assets/logo.png";
import { useDarkMode } from "@/hooks/useDarkMode";
import { useAppStore } from "@/stores/AppStore";
import { Tab as TabType } from "@/types";
import { EditProfileModal } from "../edit-profile-modal";
import { LANGUAGES } from "@/utils/languages";
import { useAuth } from "@/hooks/useAuth";
import { useLogout } from "@/api/logout";
import { useNavigate } from "react-router-dom";

interface Props {}

export const NavBar: React.FC<Props> = () => {
    const { toggleEditProfileModal, showEditProfileModal } = useAppStore();
    const { data: user } = useAuth();
    const logoutMutation = useLogout();
    const navigate = useNavigate();
    const handleLogout = async () => {
        await logoutMutation.mutateAsync();

        navigate("/login");
    };
    return (
        <div className="bg-secondary dark:bg-dark__secondary shadow-md h-full w-16 lg:w-20 flex-col flex text-accent dark:text-dark__accent">
            <AppLogo />

            <div className="flex justify-between flex-col flex-1">
                <div className="text-center">
                    <Tab tabName="chats">
                        <NavItem Icon={<i className="ri-message-3-line "></i>} tooltip={"Chats"} />
                    </Tab>

                    <Tab tabName="people">
                        <NavItem Icon={<i className="ri-user-3-line"></i>} tooltip={"People"} />
                    </Tab>
                </div>
                <div>
                    <DarkModeButton />
                    <NavItem
                        Icon={
                            <div className="text-sm font-semibold tracking-wider py-2 uppercase">
                                {user?.language}
                            </div>
                        }
                        tooltip={`Your language is ${LANGUAGES[user?.language!]}`}
                    />
                    <NavItem
                        onClick={() => toggleEditProfileModal(true)}
                        Icon={<i className="ri-profile-line"></i>}
                        tooltip={"Profile"}
                    />
                    <NavItem Icon={<i className="ri-settings-3-line"></i>} tooltip={"Settings"} />
                    <NavItem
                        onClick={handleLogout}
                        Icon={<i className="ri-logout-box-line"></i>}
                        tooltip={"Log out"}
                    />

                    {showEditProfileModal && (
                        <EditProfileModal onClose={() => toggleEditProfileModal(false)} />
                    )}
                </div>
            </div>
        </div>
    );
};

const AppLogo = () => {
    return (
        <div className="w-full lg:h-20 h-18 p-2 bg-primary ">
            <img className="w-full h-full" src={logo} alt="" />
        </div>
    );
};

type NavItemProps = {
    Icon: ReactNode;
    tooltip: string;
    onClick?: () => void;
};
const NavItem = ({ Icon, tooltip, onClick }: NavItemProps) => {
    return (
        <div
            onClick={onClick}
            role="button"
            className="text-center text-2xl relative py-2 hover:bg-secondary-content 
             dark:hover:bg-dark__secondary-content duration-200 hover:text-primary group "
        >
            <div className="peer">{Icon}</div>
            <div
                id="tooltip-default"
                role="tooltip"
                className="absolute left-full bottom-3 ml-2 z-20 block px-3 py-2 text-sm font-medium whitespace-nowrap
                 text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm dark:bg-gray-900 opacity-0
                  group-hover:opacity-100 pointer-events-none"
            >
                <div className="tooltip-arrow absolute -left-2 bottom-0 z-10"></div>
                <span>{tooltip}</span>
            </div>
        </div>
    );
};

type TabProps = {
    children: ReactNode;
    tabName: TabType;
};

const Tab = ({ children, tabName }: TabProps) => {
    const { currentTab, selectTab } = useAppStore();

    const isCurrentTab = currentTab === tabName;

    return (
        <div
            className={`${
                isCurrentTab && "text-primary bg-secondary-content dark:bg-dark__secondary-content"
            }`}
            onClick={() => selectTab(tabName)}
        >
            {children}
        </div>
    );
};

const DarkModeButton = () => {
    const { isEnabled, handleToggleDarkMode } = useDarkMode();

    return (
        <div
            role="button"
            onClick={() => handleToggleDarkMode(!isEnabled)}
            className="relative text-center py-2 text-2xl hover:bg-secondary-content dark:hover:bg-dark__secondary-content duration-200 hover:text-primary"
        >
            {isEnabled ? <i className={`ri-sun-line`}></i> : <i className={`ri-moon-line `}></i>}
        </div>
    );
};
