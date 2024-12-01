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
    username: string;
}

export interface IChangeEmail {
    email: string;
}

export interface IChangePassword {
    oldPassword: string;
    newPassword: string;
    repeatNewPassword: string;
}

export interface IUser {
    id: string;
    username: string;
    email: string;
    auctionIds: number[];
    invoiceIds: number[];
}
