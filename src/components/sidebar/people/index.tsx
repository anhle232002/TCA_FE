import { ConversationPreview } from "@/components/conversation-preview";
import { ChatsConversationPreview } from "@/components/conversation-preview/ChatsConversationPreview";
import { useUsers } from "@/hooks/useUsers";
import { useAppStore } from "@/stores/AppStore";
import React, { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { BaseTab } from "../base-tab";
import { SearchBar } from "../SearchBar";

interface Props {}

export const People: React.FC<Props> = () => {
    const { selectTab } = useAppStore();
    const { data } = useUsers();

    const dataList = useMemo(() => {
        return data?.map((user) => ({
            link: `/messages/${user._id}`,
            header: user.fullName,
            subheader: user.username,
        }));
    }, data);
    return (
        <BaseTab datalist={dataList} Component={ConversationPreview}>
            <header className="py-4 px-3">
                <div className="flex items-center justify-between">
                    <h2 className="tracking-wide text-xl font-semibold px-2">People</h2>{" "}
                    <div className="lg:hidden block">
                        <button
                            onClick={() => selectTab("")}
                            className="w-8 h-8 text-lg dark:bg-dark__accent-content/20 rounded shadow-md hover:scale-105 duration-200"
                        >
                            <i className="ri-close-line"></i>
                        </button>
                    </div>
                </div>
                <div className="mt-4">
                    <SearchBar placeholder="Search name..." />
                </div>
            </header>
        </BaseTab>
    );
};
