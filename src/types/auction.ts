export interface IAuction {
    id: number;
    date: Date;
    productId: number;
    price: number;
}

export interface IAuctionUserCardProps {
    productId: number;
}
