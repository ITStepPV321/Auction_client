import { useEffect, useState } from "react";
import AuctionCard from "./AuctionCard";
import { IAuction } from "../../types/auction";
import { AuctionService } from "../../services/auction.service";
import { Link } from "react-router-dom";
import { Box, Typography, Button, Grid } from "@mui/material";

export default function AuctionList() {
    const [auctions, setAuctions] = useState<IAuction[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchAuctions = async () => {
            try {
                setLoading(true);
                const result = await AuctionService.getAllAuctions();
                setAuctions(result);
            } catch (err) {
                setError("Failed to fetch auctions.");
            } finally {
                setLoading(false);
            }
        };

        fetchAuctions();
    }, []);

    if (loading) {
        return <Typography>Loading auctions...</Typography>;
    }

    if (error) {
        return <Typography color="error">{error}</Typography>;
    }

    return (
        <Box sx={{ padding: 4 }}>
            <Typography variant="h4" sx={{ marginBottom: 3, textAlign: "center" }}>
                Auctions
            </Typography>
            <Box sx={{ textAlign: "center", marginBottom: 4 }}>
                <Button variant="contained" color="primary" component={Link} to="/create-auction">
                    Create Auction
                </Button>
            </Box>
            <Grid container spacing={4}>
                {auctions.map((auction) => (
                    <Grid item xs={12} sm={6} md={4} key={auction.id}>
                        <AuctionCard {...auction} />
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
}
