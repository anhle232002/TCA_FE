import { ConversationPreview } from "@/components/conversation-preview";
import { useDebounceValue } from "@/hooks/useDebounce";
import { useUsers } from "@/hooks/useUsers";
import { useAppStore } from "@/stores/AppStore";
import React, { useState } from "react";
import { BaseTab } from "../base-tab";
import { SearchBar } from "../SearchBar";

interface Props {}

export const People: React.FC<Props> = () => {
    const { selectTab } = useAppStore();
    const [searchTerm, setSearchTerm] = useState("");
    const { debounceValue: searchValue, debouncing } = useDebounceValue(searchTerm, 500);
    const { data } = useUsers(searchValue);

    return (
        <BaseTab isLoading={debouncing} datalist={data} Component={ConversationPreview}>
            <header className="py-4 px-3">
                <div className="flex items-center justify-between">
                    <h2 className="tracking-wide text-xl font-semibold px-2">People</h2>
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
                    <SearchBar
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.currentTarget?.value)}
                        placeholder="Search name..."
                    />
                </div>
            </header>
        </BaseTab>
    );
};
