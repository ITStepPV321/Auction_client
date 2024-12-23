import { useEffect, useState } from "react";
import { IInvoice } from "../../types/invoice";
import { IBetHistory } from "../../types/betHistory";
import { BetHistoryService } from "../../services/betHistory.service";
import { IAuction } from "../../types/auction";
import { AuctionService } from "../../services/auction.service";
import { Box, Button, Card, CardActions, Typography } from "@mui/material";
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
        <Box className="auction-user-cont" sx={{ padding: 4 }}>
            <Box className="invoice-product-info">
                <h1 className="invoice-product-name">{auction?.name}</h1>
                <p className="invoice-more-info">More info</p>

                <div className="invoice-product-desc-cont">
                    <p className="invoice-product-desc lbl">Product description:</p>
                    <p className="invoice-product-desc">{auction?.description}</p>
                </div>

                <div className="invoice-product-date-cont">
                    <p className="invoice-product-date lbl">Date:</p>
                    <p className="invoice-product-date">{auction ? new Date(auction.date).toLocaleString() : null}</p>
                </div>

                <div className="invoice-product-year-cont">
                    <p className="invoice-product-year lbl">Product year:</p>
                    <p className="invoice-product-year">{auction?.year}</p>
                </div>

                <div className="invoice-product-price-cont">
                    <p className="invoice-product-price lbl">Price: ${betHistory?.bet}</p>
                </div>
            </Box>

            <Box className="invoice-product-actions-cont">
                <Button variant="contained" color="primary" onClick={DetailsOnClick}>
                    Details
                </Button>
                <Button variant="contained" color="error" className="error" onClick={DeleteOnClick}>
                    Delete
                </Button>
            </Box>
        </Box>
    );
}
