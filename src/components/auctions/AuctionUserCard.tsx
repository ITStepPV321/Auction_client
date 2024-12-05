import { useEffect, useState } from "react";
import { ProductService } from "../../services/product.service";
import { IAuctionUserCardProps } from "../../types/auction";
import { IProduct } from "../../types/product";
import { useNavigate } from "react-router-dom";
import { Button, Card, CardActions, Typography } from "@mui/material";

export default function AuctionUserCard({ productId }: IAuctionUserCardProps) {
    const [product, setProduct] = useState<IProduct>();

    const navigate = useNavigate();

    useEffect(() => {
        const fetchProduct = async () => {
            const result = await ProductService.get(productId);

            setProduct(result);
        };

        fetchProduct();
    }, []);

    const buyProduct = async () => {
        navigate(`/create-invoice`);
    };

    return (
        <Card className="auction-user-card">
            <Typography variant="h4" sx={{ marginBottom: 3, textAlign: "center" }}>
                {product?.name}
            </Typography>

            <CardActions className="btn-container end">
                <Button>Buy</Button>
            </CardActions>
        </Card>
    );
}
