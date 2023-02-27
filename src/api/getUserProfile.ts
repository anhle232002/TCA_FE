import { useAuth } from "@/hooks/useAuth";
import { axios } from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";

type TGetUserProfileResponse = {
    data: {
        _id?: string;
        fullName: string;
        city: string;
        phone: string;
        avatar: string;
        describe: string;
        language: string;
    };
};

const getUserProfile = async (userId: string) => {
    try {
        const { data } = await axios.get<TGetUserProfileResponse>(`/users/profile/${userId}`);

        return data.data;
    } catch (error) {
        throw error;
    }
};
export const useUserProfile = (userId?: string) => {
    const { data: user } = useAuth();

    if (!userId) userId = user?._id!;

    return useQuery(["profile", userId], () => getUserProfile(userId!), {
        select: (data) => {
            delete data._id;
            return { ...data };
        },
    });
};
