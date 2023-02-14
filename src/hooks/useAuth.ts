import { axios } from "@/lib/axios";
import { useAppStore } from "@/stores/AppStore";
import { User } from "@/types/User";
import { useQuery } from "@tanstack/react-query";

const loadUser = async () => {
    try {
        const { data } = await axios.get("/auth");

        return data.user as User;
    } catch (error) {
        throw error;
    }
};

export const useAuth = () => {
    const { setAuthUserId } = useAppStore();

    return useQuery(["user"], loadUser, {
        onSuccess(data) {
            setAuthUserId(data._id);
        },
    });
};
