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
import { BetHistoryService } from "../../services/betHistory.service";
import { IBetHistory } from "../../types/betHistory";
import { format } from "date-fns";

export default function InvoiceCard(props: IAuctionUserCardProps) {
    const navigate = useNavigate();

    const [user, setUser] = useState<IUser>({
        id: "",
        userName: "",
        email: "",
        auctionIds: [],
        invoiceIds: [],
    });

    const [auction, setAuction] = useState<IAuction>();

    const [betHistory, setBetHistory] = useState<IBetHistory>();

    useEffect(() => {
        const fetchUser = async () => {
            const result = await AuthService.get();
            setUser(result);
        };

        const fetchAuction = async () => {
            const result = await AuctionService.getAuction(props.auctionId);
            setAuction(result);
        };
        const fetcBetHistory = async () => {
            const result = await BetHistoryService.getMaxBet(auction!.id);
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
            userId: user.id,
        };
        await InvoiceService.post(invoice);
        navigate("/profile");
    };

    return (
        <div>
            <h2>Product</h2>
            <p>ID: {auction?.id}</p>
            <p>Date: {new Date (auction!.date).toLocaleDateString()}</p>
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
