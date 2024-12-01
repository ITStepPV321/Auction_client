import { useEffect, useState } from "react";
import { AuctionService } from "../../services/auction.service";
import { IAuction } from "../../types/auction";
import AuctionUserCard from "../auctions/AuctionUserCard";
import { InvoiceService } from "../../services/invoice.service";
import { IInvoice } from "../../types/invoice";
import InvoiceUserCard from "../invoices/InvoiceUserCard";
import ProfileSettings from "./ProfileSettings";
import { IUser } from "../../types/user";
import { AuthService } from "../../services/auth.service";

export default function Profile() {
    const [user, setUser] = useState<IUser>();
    const [auctions, setAuctions] = useState<IAuction[]>([]);
    const [invoices, setInvoices] = useState<IInvoice[]>([]);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const user = await AuthService.get();

                setUser(user);
            } catch (error) {
                console.error(error);
            }
        };

        fetchUser();

        const fetchAuctions = async () => {
            try {
                if (user) {
                    const auctionArr = await AuctionService.getUserWonAuctions(user.auctionIds);

                    setAuctions(auctionArr);
                }
            } catch (error) {
                console.error(error);
            }
        };

        const fetchInvoices = async () => {
            try {
                if (user) {
                    const invoiceArr = await InvoiceService.getUserInvoices(user.invoiceIds);

                    setInvoices(invoiceArr);
                }
            } catch (error) {
                console.error(error);
            }
        };

        fetchAuctions();
        fetchInvoices();
    }, []);

    return (
        <>
            <h1>My Profile</h1>
            <h3>Auctions won:</h3>
            <div>
                {auctions.map((auction) => {
                    return <AuctionUserCard productId={auction.productId} />;
                })}
            </div>
            <h3>Invoices:</h3>
            <div>
                {invoices.map((invoice) => {
                    return <InvoiceUserCard id={invoice.id} date={invoice.date} productId={invoice.productId} />;
                })}
            </div>

            <ProfileSettings />
        </>
    );
}
