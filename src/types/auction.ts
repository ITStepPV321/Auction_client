export interface IAuction {
    id: number;
    date: string;
    name:string;
    description:string;
    price: number;
}

export interface IAuctionUserCardProps {
    productId: number;
}
export interface ICreateAuction {
    date: string; 
    name: string;
    description: string;
    price: number;
}
