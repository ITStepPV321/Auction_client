import { useEffect, useState } from "react";
import AuctionCard from "./AuctionCard";
import { IAuction } from "../../types/auction";
import { AuctionService } from "../../services/auction.service";
export default function AuctionList() {

    const [auctions, setAuctions] = useState<IAuction[]>([]);

    useEffect(() => {
        const fetchAuctions = async () => {
            const result = await AuctionService.getAllAuctions();
            setAuctions(result);
        };

        fetchAuctions();
    }, []);

    return  (
        <div>
            <h1>Auctions</h1>
            <ul>
                {auctions.map(auction => (
                    <li key={auction.id}>
                        <AuctionCard auction={auction} />
                    </li>
                ))}
            </ul>
        </div>
    );
}
