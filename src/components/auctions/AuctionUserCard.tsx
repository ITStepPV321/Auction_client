import { useEffect, useState } from "react";
import { ProductService } from "../../services/product.service";
import { IAuction, IAuctionUserCardProps } from "../../types/auction";
import { IProduct } from "../../types/product";
import { useNavigate } from "react-router-dom";
import { Button, Card, CardActions, Typography } from "@mui/material";

export default function AuctionUserCard({ id, date, name, description, price }: IAuction) {
    const navigate = useNavigate();

    const buyProduct = async () => {
        navigate(`/create-invoice/${id}`);
    };

    return (
        <Card className="auction-user-card">
            <Typography variant="h4" sx={{ marginBottom: 3, textAlign: "center" }}>
                {name}
            </Typography>
            <Typography variant="h4" sx={{ marginBottom: 3, textAlign: "center" }}>
                {date}
            </Typography>
            <Typography variant="h4" sx={{ marginBottom: 3, textAlign: "center" }}>
                {description}
            </Typography>
            <Typography variant="h4" sx={{ marginBottom: 3, textAlign: "center" }}>
                {price}
            </Typography>

            <CardActions className="btn-container end">
                <Button onClick={buyProduct}>Buy</Button>
            </CardActions>
        </Card>
    );
}
