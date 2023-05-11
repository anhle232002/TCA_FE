import { axios } from "@/lib/axios";
import { useAppStore } from "@/stores/AppStore";
import storage from "@/utils/storage";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const logout = async () => {
    try {
        await axios.post("/auth/logout");

        storage.clearToken();
    } catch (error) {
        throw error;
    }
};

export const useLogout = () => {
    const { setAuthUserId } = useAppStore();
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: logout,
        onSuccess() {
            setAuthUserId(null);
            queryClient.clear();
        },
    });
};
