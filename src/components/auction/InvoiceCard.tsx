import { IAuction, IAuctionUserCardProps } from "../../types/auction";
import { useEffect, useState } from "react";
import { AuctionService } from "../../services/auction.service";
import { ProductService } from "../../services/product.service";
import { IProduct } from "../../types/product";
import { Button } from "@mui/material";
import { InvoiceService } from "../../services/invoice.service";
import { IUser } from "../../types/user";
import { AuthService } from "../../services/auth.service";
import { useNavigate } from "react-router-dom";

export default function InvoiceCard(props: IAuctionUserCardProps) {

    const navigate = useNavigate();

    const [user, setUser] = useState<IUser>({
        id: "",
        username: "",
        email: "",
        auctionIds: [],
        invoiceIds: [],
    });

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

        const fetchUser = async () => {
            const result = await AuthService.get();
            setUser(result);
        };

        const fetchAuction = async () => {
            const result = await AuctionService.getAllAuctions();
            setAuction(result);
        };

        const fetchProduct = async () => {
            const result = await ProductService.get(props.productId);
            setProduct(result);
        };
        
        fetchUser();
        fetchAuction();
        fetchProduct();
    }, []);

    const buyProduct = async () => {
        const invoice = {
            date: new Date(),
            productId: product.id,
            userId: user.id, 
        };
        await InvoiceService.post(invoice);
        navigate("/profile");
    };

    return (
        <div>
            <h2>Product</h2>
            <p>ID: {auction.id}</p>
            <p>Date: {auction.date.toLocaleDateString()}</p>
            <p>Product name: {product.name}</p>
            <p>Product description: {product.description}</p>
            <p>Product year: {product.year}</p>
            <p>Price: {auction.price}</p>
            <Button onclick={buyProduct} variant="contained" color="primary">
                Buy
            </Button>
        </div>
    );
}