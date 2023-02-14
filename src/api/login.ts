import { axios } from "@/lib/axios";
import storage from "@/utils/storage";

type LoginDTO = {
    username: string;
    password: string;
};

export const login = async (loginData: LoginDTO) => {
    try {
        const response = await axios.post("/auth/login", loginData);

        storage.setToken(response.data.accessToken);
    } catch (error) {
        throw error;
    }
};
