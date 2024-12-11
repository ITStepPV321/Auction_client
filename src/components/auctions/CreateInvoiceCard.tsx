import { IAuction, IAuctionUserCardProps } from "../../types/auction";
import { useEffect, useState } from "react";
import { AuctionService } from "../../services/auction.service";
import { Button } from "@mui/material";
import { InvoiceService } from "../../services/invoice.service";
import { IUser } from "../../types/user";
import { AuthService } from "../../services/auth.service";
import { useNavigate, useParams } from "react-router-dom";
import { BetHistoryService } from "../../services/betHistory.service";
import { IBetHistory } from "../../types/betHistory";
import { format } from "date-fns";

export default function CreateInvoiceCard() {
    const { auctionId } = useParams();
    const navigate = useNavigate();

    const [user, setUser] = useState<IUser>({
        id: "",
        userName: "",
        email: "",
        auctionIds: [],
        invoiceIds: [],
    });

    const [auction, setAuction] = useState<IAuction>({
        id: parseInt(auctionId!),
        date: "string",
        name: "string",
        description: "string",
        year: 0,
        startedPrice: 0,
        price: 0,
        sellerId: 0,
    });

    const [betHistory, setBetHistory] = useState<IBetHistory>();

    useEffect(() => {
        const fetchUser = async () => {
            const result = await AuthService.get();
            setUser(result);
        };

        const fetchAuction = async () => {
            const result = await AuctionService.getAuction(parseInt(auctionId!));
            setAuction(result);
        };
        const fetcBetHistory = async () => {
            const result = await BetHistoryService.getFullMaxBet(auction.id);
            const betHistoryId = result.id;
            const result2 = await BetHistoryService.getBetHistory(betHistoryId);
            setBetHistory(result2);
        };

        fetchUser();
        fetchAuction();
        fetcBetHistory();
    }, []);

    const buyProduct = async () => {
        const invoice = {
            date: format(new Date(), "yyyy-MM-dd'T'HH:mm:ss.SSS"),
            betHistoryId: betHistory!.id,
        };
        console.log(invoice);
        await InvoiceService.post(invoice);
        navigate("/profile");
    };

    return (
        <div>
            <h2>Product</h2>
            <p>ID: {auction?.id}</p>
            <p>Date: {new Date(auction!.date).toLocaleDateString()}</p>
            <p>Product name: {auction?.name}</p>
            <p>Product description: {auction?.description}</p>
            <p>Product year: {auction?.year}</p>
            <p>Price: {betHistory?.bet}</p>
            <Button onClick={buyProduct} variant="contained" color="primary">
                Buy
            </Button>
        </div>
    );
}
