import { instance } from "../api/axios.api";
import { ICreateInvoice, IInvoice } from "../types/invoice";

export const InvoiceService = {
    async getUserInvoice(id: number): Promise<IInvoice> {
        const result = await instance.get(`invoices/${id}`);

        return result.data;
    },

    async getUserInvoices(ids: number[]): Promise<IInvoice[]> {
        const result = [];

        for (let i = 0; i < ids.length; i++) {
            const id = ids[i];
            const invoice = await this.getUserInvoice(id);

            result.push(invoice);
        }

        return result;
    },

    async post(Invoice: ICreateInvoice): Promise<void> {
        const result = await instance.post(`Invoices`, Invoice);
    },
};
