import { promises } from "dns";
import { instance } from "../api/axios.api";
import { IBetHistory } from "../types/betHistory";
import { ICreateInvoice, IInvoice } from "../types/invoice";

export const InvoiceService = {
    async getUserInvoice(id: number): Promise<IInvoice> {
        const result = await instance.get(`invoices/${id}`);

        return result.data;
    },

    async getUserInvoices(wonBets: IBetHistory[]): Promise<IInvoice[]> {
        const result = [];

        for (let i = 0; i < wonBets.length; i++) {
            const id = wonBets[i].id;
            const invoice = await this.getUserInvoiceByWonBet(id);

            if (invoice) {
                result.push(invoice);
            }
        }

        return result;
    },

    async getUserInvoiceByWonBet(betId: number): Promise<IInvoice> {
        const result = await instance.get<IInvoice>(`invoices/get-by-bethistory/${betId}`);

        return result.data;
    },

    async get(id:number): Promise <IInvoice> {
        const result = await instance.get(`invoices/get/${id}`);

        return result.data;
    },

    async post(Invoice: ICreateInvoice): Promise<void> {
        const result = await instance.post(`invoices`, Invoice);
    },
};
