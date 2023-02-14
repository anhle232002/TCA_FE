import { axios } from "@/lib/axios";

type SignUpDTO = {
    username: string;
    fullName: string;
    password: string;
    repeat_password: string;
};

export const signUp = async (signupData: SignUpDTO) => {
    try {
        const { data } = await axios.post("/auth/signup", signupData);

        return data;
    } catch (error) {
        throw error;
    }
};
