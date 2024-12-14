import { Box, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { InvoiceService } from "../../services/invoice.service";
import { IInvoice } from "../../types/invoice";
import { BetHistoryService } from "../../services/betHistory.service";
import { IBetHistory } from "../../types/betHistory";
import { IAuction } from "../../types/auction";
import { AuctionService } from "../../services/auction.service";

export default function InvoiceCard() {
    const { id } = useParams<{ id: string }>();
    const [invoice, setInvoice] = useState<IInvoice | null>(null); // Зробіть тип стану для інвойса null, поки він не буде отриманий.
    const [auction, setAuction] = useState<IAuction>();

    const [betHistory, setBetHistory] = useState<IBetHistory>()
    useEffect(() => {
        const fetchInvoice = async () => {
            const fetchedInvoice: IInvoice = await InvoiceService.get(Number(id));
            setInvoice(fetchedInvoice); // зберігаємо інвойс у стані

            if (fetchedInvoice?.betHistoryId) { // перевіряємо наявність betHistoryId
                const fetchedBetHistory = await BetHistoryService.getBetHistory(fetchedInvoice.betHistoryId);
                setBetHistory(fetchedBetHistory);
                const fetchedAuction = await AuctionService.getAuction(fetchedBetHistory.auctionId);
                setAuction(fetchedAuction);
            }
        };

        fetchInvoice();
    }, [id]); // додаємо id у залежності, щоб перевиконати ефект при зміні id

    return (
        <Box>
            <Typography variant="h4" component="h2">
                Date: {invoice ? invoice.date : "Loading..."}
            </Typography>
            <Typography>
                Bet: ${betHistory?.bet}
            </Typography>
            <Typography>
                Name: {auction?.name}
            </Typography>
            <Typography>
                Description: {auction?.description}
            </Typography>
            <Typography>
                Auction Date: {auction?.date}
            </Typography>
            <Typography>
                Year: {auction?.year}
            </Typography>
        </Box>
    );
}