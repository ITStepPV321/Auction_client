import { IAuction, IAuctionUserCardProps } from "../../types/auction";
import { useEffect, useState } from "react";
import { AuctionService } from "../../services/auction.service";
import { ProductService } from "../../services/product.service";
import { IProduct } from "../../types/product";
export default function AuctionCard(props: IAuctionUserCardProps) {
    const [auction, setAuction] = useState<IAuction>({
        id: 0,
        date: new Date(),
        productId: 0,
        price: 0,
    });

    const [product, setProduct] = useState<IProduct>({
        id: 0,
        name: "",
        description: "",
        price: 0,
    });

    useEffect(() => {
        const fetchAuction = async () => {
            const result = await AuctionService.getAllAuctions();
            setAuction(result);
        };

        const fetchProduct = async () => {
            const result = await ProductService.get(props.productId);
            setProduct(result);
        };

        fetchAuction();
        fetchProduct();
    }, []);

    return (
        <div>
            <h2>Auction</h2>
            <p>ID: {auction.id}</p>
            <p>Date: {auction.date.toLocaleDateString()}</p>
            <p>Product name: {product.name}</p>
            <p>Product description: {product.description}</p>
            <p>Product year: {product.year}</p>
            <p>Price: {auction.price}</p>
        </div>
    );
}