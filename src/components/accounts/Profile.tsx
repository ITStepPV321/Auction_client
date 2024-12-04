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
    const [user, setUser] = useState<IUser | null>(null);
    const [auctions, setAuctions] = useState<IAuction[]>([]);
    const [invoices, setInvoices] = useState<IInvoice[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch user data
                const fetchedUser = await AuthService.get();
                setUser(fetchedUser);

                if (fetchedUser) {
                    // Fetch user's won auctions
                    const auctionArr = await AuctionService.getUserWonAuctions(fetchedUser.auctionIds || []);
                    setAuctions(auctionArr);

                    // Fetch user's invoices
                    const invoiceArr = await InvoiceService.getUserInvoices(fetchedUser.invoiceIds || []);
                    setInvoices(invoiceArr);
                }
            } catch (err) {
                setError("Failed to fetch data.");
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p style={{ color: "red" }}>{error}</p>;
    }

    return (
        <div>
            <h1>My Profile</h1>

            {/* User Information */}
            {user && (
                <div>
                    <p>
                        <strong>Username:</strong> {user.username}
                    </p>
                    <p>
                        <strong>Email:</strong> {user.email}
                    </p>
                </div>
            )}

            {/* Auctions Section */}
            <h3>Auctions won:</h3>
            <div>
                {auctions.length > 0 ? (
                    auctions.map((auction) => (
                        <AuctionUserCard key={auction.id} productId={auction.id} />
                    ))
                ) : (
                    <p>No auctions won yet.</p>
                )}
            </div>

            {/* Invoices Section */}
            <h3>Invoices:</h3>
            <div>
                {invoices.length > 0 ? (
                    invoices.map((invoice) => (
                        <InvoiceUserCard
                            key={invoice.id}
                            id={invoice.id}
                            date={invoice.date}
                            productId={invoice.productId}
                        />
                    ))
                ) : (
                    <p>No invoices available.</p>
                )}
            </div>

            {/* Profile Settings */}
            <ProfileSettings />
        </div>
    );
}
