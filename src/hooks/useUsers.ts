import { axios } from "@/lib/axios";
import { User } from "@/types/User";
import { useQuery } from "@tanstack/react-query";

const getUsers = async () => {
    const {
        data: { data },
    } = await axios.get("/users");

    return data as User[];
};

export const useUsers = () => {
    return useQuery(["users"], getUsers, {
        select(data) {
            return data?.map((user) => ({
                link: `/messages/${user._id}`,
                header: user.fullName,
                subheader: user.username,
            }));
        },
    });
};
