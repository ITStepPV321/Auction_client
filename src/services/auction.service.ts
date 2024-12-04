import axios from "axios";
import { instance } from "../api/axios.api";
import { IAuction, ICreateAuction } from "../types/auction";

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

    async getAllAuctions(): Promise<IAuction[]> {
        const result = await instance.get<IAuction[]>(`auctions`);

        return result.data;
    },
     async create(auction: ICreateAuction): Promise<void> {
        try {
            const response = await axios.post("https://auctionwebapi-hacgcbg3btcnawct.polandcentral-01.azurewebsites.net/api/auctions/create", auction, {
                headers: {
                    "Content-Type": "application/json",
                },
            });
            console.log("Response from server:", response.data);
            if (response.status !== 200) {
                console.log("200")
            }
            
        } catch (error) {
            console.error("Failed to create auction:", error);
            throw error;
        }
    },
    async delete(id:number):Promise<void>{
        const result = await instance.delete(`auctions/${id}`)
    }
};
