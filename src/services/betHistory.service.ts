import { instance } from "../api/axios.api";
import { IBetHistory, ICreateBet, IMaxBet } from "../types/betHistory";

export const BetHistoryService = {
    async getMaxBet(auctionId: number): Promise<IMaxBet> {
        const result = await instance.get<IMaxBet>(`bethistories/get-max-bet/${auctionId}`);

        return result.data;
    },

    async getFullMaxBet(auctionId: number): Promise<IBetHistory> {
        const result = await instance.get<IBetHistory>(`bethistories/get-full-max-bet/${auctionId}`);
        return result.data;
    },

    async getBetHistory(betHistoryId: number): Promise<IBetHistory> {
        const result = await instance.get<IBetHistory>(`bethistories/get/${betHistoryId}`);

        return result.data;
    },

    async getUserWonBets(): Promise<IBetHistory[]> {
        const result = await instance.get<IBetHistory[]>("bethistories/get-user-won-bets/");

        return result.data;
    },

    async makeBet(betData: ICreateBet): Promise<void> {
        const result = await instance.post("bethistories/create-bet", betData);

        console.log(result);
    },
};
