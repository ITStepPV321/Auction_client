import { instance } from "../api/axios.api";
import { IAuction } from "../types/auction";

export const AuctionService = {
    async getUserWonAuction(id: number): Promise<IAuction> {
        const result = await instance.get<IAuction>(`auctions/${id}`);

        return result.data;
    },

    async getUserWonAuctions(ids: number[]): Promise<IAuction[]> {
        const result = [];

        for (let i = 0; i < ids.length; i++) {
            const id = ids[i];
            const auction = await this.getUserWonAuction(id);

            result.push(auction);
        }

        return result;
    },
};
