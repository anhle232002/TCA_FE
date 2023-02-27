import { User } from "@/types/User";

export const getReceiver = (members?: User[], authUserId?: string) => {
    if (!members || !authUserId) return null;

    return members.find((rep) => rep._id !== authUserId);
};
