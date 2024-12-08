import { useEffect, useState } from "react";
import { IInvoice } from "../../types/invoice";
import { IProduct } from "../../types/product";
import { ProductService } from "../../services/product.service";
import { IBetHistory } from "../../types/betHistory";
import { BetHistoryService } from "../../services/betHistory.service";
import { IAuction } from "../../types/auction";
import { IUser } from "../../types/user";
import { AuctionService } from "../../services/auction.service";

export default function InvoiceUserCard({ id, date, betHistoryId }: IInvoice) {
    const [betHistory, setBetHistory] = useState<IBetHistory>();

    const [auction, setAuctions] = useState<IAuction>();

    useEffect(() => {
        const fetchBetHistory = async () => {
            const result = await BetHistoryService.getBetHistory(betHistoryId);

            setBetHistory(result);
        };
        const fetchAuction = async () => {            
            const result = await AuctionService.getAuction(betHistory!.auctionId);
            setAuctions(result);
        };
        fetchBetHistory();
        fetchAuction();
    }, []);



    return (
        <div className="invoice-user-card">
            <h4>{auction!.name}</h4>
            <h4>{auction!.date}</h4>
            <h4>{auction!.description}</h4>
            <h4>{auction!.price}</h4>
            <div className="btn-container end">
                <button>Details</button>
                <button>Delete</button>
            </div>
        </div>
    );
}
