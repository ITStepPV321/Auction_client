import { instance } from "../api/axios.api";
import { IInvoice } from "../types/invoice";
import { IProduct } from "../types/product";

export const ProductService = {
    async get(id: number): Promise<IProduct> {
        const result = await instance.get(`products/${id}`);

        return result.data;
    },
    async delete(id:number):Promise<void>{
        const result= await instance.delete(`products/${id}`)
    }

};
