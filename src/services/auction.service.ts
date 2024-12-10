import axios from "axios";
import { instance } from "../api/axios.api";
import { IAuction, ICreateAuction, IUpdateAuction } from "../types/auction";
import { IBetHistory } from "../types/betHistory";

export const AuctionService = {
    async getUserWonAuction(id: number): Promise<IAuction> {
        const result = await instance.get<IAuction>(`auctions/${id}`);

        return result.data;
    },

    async getUserWonAuctions(wonBets: IBetHistory[]): Promise<IAuction[]> {
        const result = [];

        for (let i = 0; i < wonBets.length; i++) {
            const id = wonBets[i].auctionId;
            const auction = await this.getUserWonAuction(id);

            result.push(auction);
        }

        return result;
    },

    async getAuction(id: number): Promise<IAuction> {
        const result = await instance.get<IAuction>(`auctions/${id}`);

        return result.data;
    },

    async getAllAuctions(): Promise<IAuction[]> {
        const result = await instance.get<IAuction[]>(`auctions`);

        return result.data;
    },
    async create(auction: ICreateAuction): Promise<void> {
        try {
            const response = await instance.post("auctions/create", auction);
            console.log("Response from server:", response.data);
            if (response.status !== 200) {
                console.log("200");
            }
        } catch (error) {
            console.error("Failed to create auction:", error);
            throw error;
        }
    },
    async delete(id: number): Promise<void> {
        const result = await instance.delete(`auctions/${id}`);
    },
    async update(id: number, auction: IUpdateAuction): Promise<void> {
        console.log("Sending PUT request to update auction:", auction);
        const result = await instance.put(`auctions/${id}`, auction);

        if (!result.status || result.status >= 400) {
            throw new Error("Failed to update auction.");
        }
    },
};
