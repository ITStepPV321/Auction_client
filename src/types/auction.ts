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
    auctionId: number;
}
export interface ICreateAuction {
    date: string;
    name: string;
    description: string;
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
