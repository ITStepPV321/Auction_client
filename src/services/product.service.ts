import { instance } from "../api/axios.api";
import { IProduct } from "../types/product";

export const ProductService = {
    async get(id: number): Promise<IProduct> {
        const result = await instance.get(`products/${id}`);

        return result.data;
    },
};
