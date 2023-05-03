import { axios } from "@/lib/axios";
import { User } from "@/types/User";
import { useQuery } from "@tanstack/react-query";

const getUsers = async (query?: string) => {
    let params: any = {};

    if (query && query !== "") {
        params.search = query;
    }

    const {
        data: { data },
    } = await axios.get("/users", { params });

    return data as User[];
};

export const useUsers = (query?: string) => {
    const queryKey = query ? ["users", query] : ["users"];

    return useQuery(queryKey, () => getUsers(query), {
        select(data) {
            return data?.map((user) => ({
                link: `/messages/${user._id}`,
                header: user.fullName,
                subheader: user.username,
                image: user.avatar,
            }));
        },
    });
};
export const useSearchUsers = (query: string) => {
    return useQuery([`users/${query}`], () => getUsers(query), {
        select(data) {
            return data?.map((user) => ({
                link: `/messages/${user._id}`,
                header: user.fullName,
                subheader: user.username,
                image: user.avatar,
            }));
        },
    });
};
