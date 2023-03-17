import { useAuth } from "@/hooks/useAuth";
import { axios } from "@/lib/axios";
import { queryClient } from "@/lib/react-query";
import { UserProfile } from "@/types/User";
import { useMutation } from "@tanstack/react-query";

type UpdateProfileDTO = {
    fullName?: string;
    city?: string;
    describe?: string;
    phone?: string;
    avatar?: string;
};

const updateProfile = async (data: UpdateProfileDTO) => {
    await axios.put("/users/profile", data);
};

export const useUpdateProfile = () => {
    const { data: user, refetch: refreshUserData } = useAuth();

    return useMutation({
        mutationFn: updateProfile,
        onSuccess(_, variables, __) {
            queryClient.setQueryData<UserProfile>(["profile", user?._id], (prev) => {
                return { ...prev, ...variables };
            });

            refreshUserData();
        },
    });
};
