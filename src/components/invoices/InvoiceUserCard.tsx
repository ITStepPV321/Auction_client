import { useEffect, useState } from "react";
import { IInvoice } from "../../types/invoice";
import { IBetHistory } from "../../types/betHistory";
import { BetHistoryService } from "../../services/betHistory.service";
import { IAuction } from "../../types/auction";
import { AuctionService } from "../../services/auction.service";

export default function InvoiceUserCard({ id, date, betHistoryId }: IInvoice) {
    const [auction, setAuction] = useState<IAuction>();

    useEffect(() => {
        const fetchBetHistory = async () => {
            const fetchedBetHistory = await BetHistoryService.getBetHistory(betHistoryId);
            const fetchedAuction = await AuctionService.getAuction(fetchedBetHistory.auctionId);

            setAuction(fetchedAuction);
        };
        fetchBetHistory();
    }, []);

    return (
        <div className="invoice-user-card">
            <h4>{auction?.name}</h4>
            <h4>{auction?.date}</h4>
            <h4>{auction?.description}</h4>
            <h4>{auction?.price}</h4>
            <div className="btn-container end">
                <button>Details</button>
                <button>Delete</button>
            </div>
        </div>
    );
}
