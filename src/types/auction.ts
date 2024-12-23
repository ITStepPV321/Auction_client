export interface IAuction {
    id: number;
    date: string;
    name: string;
    description: string;
    year: number;
    startedPrice: number;
    price: number;
    sellerId: number;
}

export interface IAuctionUserCardProps {
    id: number;
    date: string;
    name: string;
    description: string;
    year: number;
    price: number;
    canBuy: boolean;
}
export interface ICreateAuction {
    date: string;
    name: string;
    description: string;
    year: number;
    price: number;
}
export interface IUpdateAuction {
    id: number;
    date: string;
    name: string;
    description: string;
    price: number;
}

export interface ITimerProps {
    auctionId: number;
    date: string;
}

export interface ICountDownProps {
    date: string;
}
