export interface IInvoice {
    id: number;
    date: string;
    betHistoryId: number;
}

export interface ICreateInvoice {
    date: string;
    betHistoryId: number;
    userId: string;
}
