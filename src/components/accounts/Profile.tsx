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
import { BetHistoryService } from "../../services/betHistory.service";
import { IBetHistory } from "../../types/betHistory";

export default function Profile() {
    const [user, setUser] = useState<IUser | null>(null);
    const [wonBets, setWonBets] = useState<IBetHistory[]>([]);
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
                    // Fetch user's won bets
                    const fetchedWonBets = await BetHistoryService.getUserWonBets();
                    setWonBets(fetchedWonBets);
                    // Fetch user's won auctions
                    const fetchedAuction = await AuctionService.getUserWonAuctions(fetchedWonBets);
                    setAuctions(fetchedAuction);

                    // Fetch user's invoices
                    const fetchedInvoices = await InvoiceService.getUserInvoices(fetchedWonBets);
                    setInvoices(fetchedInvoices);
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
        return <Typography sx={{ padding: 4 }}>Loading...</Typography>;
    }

    if (error) {
        return (
            <Typography sx={{ padding: 4 }} style={{ color: "red" }}>
                {error}
            </Typography>
        );
    }

    return (
        <Box sx={{ padding: 4 }}>
            <Typography variant="h4" sx={{ marginBottom: 3, textAlign: "center" }}>
                My Profile
            </Typography>

            {/* User Information */}
            {user && (
                <Box className="profile-container">
                    <Typography variant="subtitle1" sx={{ marginBottom: 3, textAlign: "center" }}>
                        Username: {user.userName}
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
                <Grid className="grid" container spacing={22}>
                    {auctions.map((auction) => (
                        <Grid item xs={12} sm={6} md={4} key={auction.id}>
                            {invoices.find(
                                (invoice) =>
                                    invoice.betHistoryId ==
                                    wonBets.find((betHistory) => betHistory.auctionId == auction.id)?.id
                            ) != null ? (
                                <AuctionUserCard {...auction} canBuy={false} />
                            ) : (
                                <AuctionUserCard {...auction} canBuy={true} />
                            )}
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
                <Grid className="grid" container spacing={22}>
                    {invoices.map((invoice) => (
                        <Grid item xs={12} sm={6} md={4} key={invoice.id}>
                            <InvoiceUserCard id={invoice.id} date={invoice.date} betHistoryId={invoice.betHistoryId} />
                        </Grid>
                    ))}
                </Grid>
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
