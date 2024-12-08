export interface ILogin {
    email: string;
    password: string;
}

export interface IRegister {
    username: string;
    email: string;
    password: string;
}

export interface IChangeUsername {
    id: string;
    userName: string;
}

export interface IChangeEmail {
    id: string;
    email: string;
}

export interface IChangePassword {
    id: string;
    oldPassword: string;
    newPassword: string;
    repeatPassword: string;
}

export interface IUser {
    id: string;
    userName: string;
    email: string;
    auctionIds: number[];
    invoiceIds: number[];
}
