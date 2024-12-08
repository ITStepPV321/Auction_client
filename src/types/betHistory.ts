export interface IBetHistory {
    id: number;
    bet: number;
    userId: string;
    auctionId: number;
    date: string;
}

export interface ICreateBet {
    bet: number;
    userId: string;
    auctionId: number;
    date: string;
}

export interface IMaxBet {
    bet: number;
    userName: string;
    date: string;
}
