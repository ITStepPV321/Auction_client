import { IAuction } from "../../types/auction";
import { useNavigate } from "react-router-dom";
import { Button, Card, CardActions, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { BetHistoryService } from "../../services/betHistory.service";
import { IMaxBet } from "../../types/betHistory";

export default function AuctionUserCard({ id, date, name, description, price }: IAuction) {
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
        <Card className="auction-user-card">
            <Typography variant="h5" sx={{ marginBottom: 3, textAlign: "center" }}>
                {name}
            </Typography>
            <Typography variant="subtitle1" sx={{ marginBottom: 3, textAlign: "center" }}>
                {date}
            </Typography>
            <Typography variant="subtitle1" sx={{ marginBottom: 3, textAlign: "center" }}>
                {description}
            </Typography>
            <Typography variant="subtitle1" sx={{ marginBottom: 3, textAlign: "center" }}>
                ${betHistory?.bet}
            </Typography>

            <CardActions className="btn-container end">
                <Button size="small" color="primary" onClick={buyProduct}>
                    Buy
                </Button>
            </CardActions>
        </Card>
    );
}
