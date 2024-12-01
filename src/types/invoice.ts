export interface IInvoice {
    id: number;
    date: Date;
    productId: number;
}

export interface ICreateInvoice {
    date: Date;
    productId: number;
    userId: number;
}
