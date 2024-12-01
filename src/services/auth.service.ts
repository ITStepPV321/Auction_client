import { instance } from "../api/axios.api";
import { removeToken } from "../helpers/localStorage.helper";
import { IChangeEmail, IChangePassword, IChangeUsername, ILogin, IRegister, IUser } from "../types/user";

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

    async changeUsername(userData: IChangeUsername): Promise<void> {
        await instance.post("/users/change-username", userData);
    },

    async changeEmail(userData: IChangeEmail): Promise<void> {
        await instance.post("/users/change-email", userData);
    },

    async changePassword(userData: IChangePassword): Promise<void> {
        await instance.post("users/change-password", userData);
    },

    async delete(): Promise<void> {
        await instance.delete("users/delete-user");
    },

    async get(): Promise<IUser> {
        const result = await instance.get("users/get");

        return result.data;
    },
};
