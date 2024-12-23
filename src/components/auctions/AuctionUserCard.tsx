import { IAuctionUserCardProps } from "../../types/auction";
import { useNavigate } from "react-router-dom";
import { Box, Button, Card, CardActions, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { BetHistoryService } from "../../services/betHistory.service";
import { IMaxBet } from "../../types/betHistory";

export default function AuctionUserCard({ id, date, name, description, year, price, canBuy }: IAuctionUserCardProps) {
    const navigate = useNavigate();
    const [betHistory, setBetHistory] = useState<IMaxBet>();

    const buyProduct = async () => {
        navigate(`/create-invoice/${id}`);
    };

    useEffect(() => {
        const fetchBetHistory = async () => {
            const fetchedBetHistory = await BetHistoryService.getMaxBet(id);

            setBetHistory(fetchedBetHistory);
        };

        fetchBetHistory();
    }, []);

    return (
        <Box className="auction-user-cont" sx={{ padding: 4 }}>
            <Box className="invoice-product-info">
                <h1 className="invoice-product-name">{name}</h1>
                <p className="invoice-more-info">More info</p>

                <div className="invoice-product-desc-cont">
                    <p className="invoice-product-desc lbl">Product description:</p>
                    <p className="invoice-product-desc">{description}</p>
                </div>

                <div className="invoice-product-date-cont">
                    <p className="invoice-product-date lbl">Date:</p>
                    <p className="invoice-product-date">{new Date(date).toLocaleString()}</p>
                </div>

                <div className="invoice-product-year-cont">
                    <p className="invoice-product-year lbl">Product year:</p>
                    <p className="invoice-product-year">{year}</p>
                </div>
            </Box>

            <Box className="invoice-product-buy-cont">
                <p className="invoice-product-price lbl">${betHistory?.bet}</p>

                {canBuy ? (
                    <Button
                        className="invoice-product-buy-cont"
                        variant="contained"
                        color="primary"
                        onClick={buyProduct}
                    >
                        Buy
                    </Button>
                ) : null}
            </Box>
        </Box>
    );
}
