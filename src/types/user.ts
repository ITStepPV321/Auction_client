export interface ILogin {
    email: string;
    password: string;
}

export interface IRegister {
    username: string;
    email: string;
    password: string;
}

export interface IEditUser {
    username: string;
    email: string;
    password: string;
    repeatPassword: string;
}
