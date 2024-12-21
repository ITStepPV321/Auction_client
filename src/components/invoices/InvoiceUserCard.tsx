import { useEffect, useState } from "react";
import { IInvoice } from "../../types/invoice";
import { IBetHistory } from "../../types/betHistory";
import { BetHistoryService } from "../../services/betHistory.service";
import { IAuction } from "../../types/auction";
import { AuctionService } from "../../services/auction.service";
import { Button, Card, CardActions, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { InvoiceService } from "../../services/invoice.service";

export default function InvoiceUserCard({ id, betHistoryId }: IInvoice) {
    const navigate = useNavigate();

    const [betHistory, setBetHistory] = useState<IBetHistory>();
    const [auction, setAuction] = useState<IAuction>();

    const fetchBetHistory = async () => {
        const fetchedBetHistory = await BetHistoryService.getBetHistory(betHistoryId);
        const fetchedAuction = await AuctionService.getAuction(fetchedBetHistory.auctionId);

        setBetHistory(fetchedBetHistory);
        setAuction(fetchedAuction);
    };

    useEffect(() => {
        fetchBetHistory();
    }, []);

    const DetailsOnClick = () => {
        navigate(`/invoice/${id}`);
    };

    const DeleteOnClick = async () => {
        await InvoiceService.delete(id);
        window.location.reload();
    };

    return (
        <Card className="invoice-user-card">
            <Typography variant="h5" sx={{ marginBottom: 3, textAlign: "center" }}>
                {auction?.name}
            </Typography>
            <Typography variant="subtitle1" sx={{ marginBottom: 3, textAlign: "center" }}>
                {auction?.date}
            </Typography>
            <Typography variant="subtitle1" sx={{ marginBottom: 3, textAlign: "center" }}>
                {auction?.description}
            </Typography>
            <Typography variant="subtitle1" sx={{ marginBottom: 3, textAlign: "center" }}>
                ${betHistory?.bet}
            </Typography>
            <CardActions className="btn-container end">
                <Button size="small" color="primary" onClick={DetailsOnClick}>
                    Details
                </Button>
                <Button size="small" color="error" className="error" onClick={DeleteOnClick}>
                    Delete
                </Button>
            </CardActions>
        </Card>
    );
}
