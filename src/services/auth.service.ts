import { instance } from "../api/axios.api";
import { removeToken } from "../helpers/localStorage.helper";
import { ILogin, IRegister } from "../types/user";

export const AuthService = {
    async login(userData: ILogin): Promise<string | undefined> {
        const result = await instance.post<string>("/login", userData);
        console.log(result);

        return result.data;
    },

    async register(userData: IRegister): Promise<void> {
        await instance.post("/register", userData);
    },

    async logout() {
        removeToken();
    },
};
