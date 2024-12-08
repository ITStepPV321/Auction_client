import { instance } from "../api/axios.api";
import { ICreateBet, IMaxBet } from "../types/betHistory";

export const BetHistoryService = {
    async getMaxBet(auctionId: number): Promise<IMaxBet> {
        const result = await instance.get<IMaxBet>(`bethistories/get-max-bet/${auctionId}`);

        return result.data;
    },

    async makeBet(betData: ICreateBet): Promise<void> {
        const result = await instance.post("bethistories/create-bet", betData);

        console.log(result);
    },
};
