import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AuctionService } from "../../services/auction.service";
import { IAuction } from "../../types/auction";
import { Box, Typography, CircularProgress } from "@mui/material";

export default function DetailsPage() {
    const { id } = useParams<{ id: string }>(); // Отримання id з маршруту
    const [auction, setAuction] = useState<IAuction | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchAuction = async () => {
            try {
                setLoading(true);
                const fetchedAuction = await AuctionService.getUserWonAuction(Number(id));
                setAuction(fetchedAuction);
            } catch (err) {
                setError("Failed to load auction details.");
            } finally {
                setLoading(false);
            }
        };

        fetchAuction();
    }, [id]);

    if (loading) {
        return <CircularProgress />;
    }

    if (error) {
        return <Typography color="error">{error}</Typography>;
    }

    return (
        <Box sx={{ padding: 4 }}>
            <Typography variant="h4">{auction?.name}</Typography>
            <Typography variant="body1" sx={{ marginBottom: 2 }}>
                {auction?.description}
            </Typography>
            <Typography variant="body2" color="text.secondary">
                Date: {auction?.date}
            </Typography>
            <Typography variant="body2" color="text.primary">
                Price: {auction?.price} $
            </Typography>
        </Box>
    );
}
