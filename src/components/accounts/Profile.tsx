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
import { Box, Grid, Typography } from "@mui/material";

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
        <Box sx={{ padding: 4 }}>
            <Typography variant="h4" sx={{ marginBottom: 3, textAlign: "center" }}>
                My Profile
            </Typography>

            {/* User Information */}
            {user && (
                <Box>
                    <Typography variant="subtitle1" sx={{ marginBottom: 3, textAlign: "center" }}>
                        Username: {user.username}
                    </Typography>
                    <Typography variant="subtitle1" sx={{ marginBottom: 3, textAlign: "center" }}>
                        Email: {user.email}
                    </Typography>
                </Box>
            )}

            {/* Auctions Section */}
            <Typography variant="h5" sx={{ marginBottom: 3, textAlign: "center" }}>
                Auctions won:
            </Typography>
            {auctions.length > 0 ? (
                <Grid container spacing={4}>
                    {auctions.map((auction) => (
                        <Grid item xs={12} sm={6} md={4} key={auction.id}>
                            {/* <AuctionUserCard {...auction} /> */}
                        </Grid>
                    ))}
                </Grid>
            ) : (
                <Typography variant="subtitle1" sx={{ textAlign: "center" }}>
                    No auctions won yet.
                </Typography>
            )}

            {/* Invoices Section */}
            <Typography variant="h5" sx={{ marginBottom: 3, textAlign: "center" }}>
                Invoices:
            </Typography>
            {invoices.length > 0 ? (
                invoices.map((invoice) => (
                    <Grid container spacing={4}>
                        {auctions.map((auction) => (
                            <Grid item xs={12} sm={6} md={4} key={auction.id}>
                                <InvoiceUserCard
                                    key={invoice.id}
                                    id={invoice.id}
                                    date={invoice.date}
                                    productId={invoice.productId}
                                />
                            </Grid>
                        ))}
                    </Grid>
                ))
            ) : (
                <Typography variant="subtitle1" sx={{ textAlign: "center" }}>
                    No invoices available.
                </Typography>
            )}

            {/* Profile Settings */}
            <ProfileSettings />
        </Box>
    );
}
