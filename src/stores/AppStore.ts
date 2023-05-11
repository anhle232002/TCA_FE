import { useAuth } from "@/hooks/useAuth";
import { Tab } from "@/types";
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

interface AppStoreState {
    currentTab: "chats" | "people" | "";
    showEditProfileModal: boolean;
    currentConversation: string;
    authUserId: string | null;

    selectTab: (tab: Tab) => void;
    isAuthUser: (id: string) => boolean;
    selectConversation: (conversationId: string) => void;
    toggleEditProfileModal: (isActive: boolean) => void;
    setAuthUserId: (id: string | null) => void;
}

export const useAppStore = create<AppStoreState>()(
    immer<AppStoreState>((set, get) => ({
        currentTab: "",
        showEditProfileModal: false,
        currentConversation: "",
        authUserId: "",

        toggleEditProfileModal(isActive) {
            set((state) => {
                state.showEditProfileModal = isActive;
            });
        },
        selectTab(tab) {
            set((state) => {
                state.currentTab = tab;
            });
        },

        selectConversation(conversationId) {
            set((state) => {
                state.currentConversation = conversationId;
            });
        },

        isAuthUser(id) {
            return get().authUserId === id;
        },

        setAuthUserId(id) {
            set((state) => {
                state.authUserId = id;
            });
        },
    }))
);
