import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AuctionService } from "../../services/auction.service";
import { IAuction } from "../../types/auction";
import { Box, Typography, CircularProgress, TextField, Button } from "@mui/material";
import Timer from "./Timer";
import { BetHistoryService } from "../../services/betHistory.service";
import { ICreateBet } from "../../types/betHistory";
import { format } from "date-fns";

export default function DetailsPage() {
    const { id } = useParams<{ id: string }>(); // Отримання id з маршруту
    const [auction, setAuction] = useState<IAuction | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [betAmount, setBetAmount] = useState<number | string>(""); // Поле для введення суми
    const [betError, setBetError] = useState<string | null>(null); // Помилка для перевірки суми

    useEffect(() => {
        const fetchAuction = async () => {
            try {
                setLoading(true);
                const fetchedAuction = await AuctionService.getUserWonAuction(Number(id));
                console.log("Fetched auction:", fetchedAuction); // Лог
                setAuction(fetchedAuction);
            } catch (err) {
                console.error("Error fetching auction:", err);
                setError("Failed to load auction details.");
            } finally {
                setLoading(false);
            }
        };

        fetchAuction();
    }, [id]);

    const handleBet = async () => {
        const maxBet = await BetHistoryService.getMaxBet(auction ? auction.id : 0);

        console.log("Bet button clicked!"); // Лог для перевірки
        if (!auction) return;

        const currentPrice = maxBet.bet ? maxBet.bet : auction.price;
        console.log(currentPrice);
        console.log(betAmount);

        //typeof betAmount === "string" ||
        if (Number(betAmount) <= currentPrice) {
            setBetError(`Bet amount must be greater than ${currentPrice} $`);
            return;
        }

        try {
            console.log("Updating auction with bet amount:", betAmount); // Лог для дебагу

            const bet: ICreateBet = {
                bet: Number(betAmount),
                userId: "string",
                auctionId: auction?.id,
                date: format(new Date(new Date().getUTCDate()), "yyyy-MM-dd'T'HH:mm:ss.SSS"),
            };
            // const updatedAuction = {
            //     ...auction,
            //     price: Number(betAmount), // Оновлюємо ставку
            // };

            await BetHistoryService.makeBet(bet);

            //await AuctionService.update(auction.id, updatedAuction);

            //setAuction(updatedAuction);
            setBetError(null);
            setBetAmount("");
            //window.location.reload();
        } catch (err) {
            console.error("Error while placing the bet:", err);
            setBetError("Failed to place the bet. Please try again.");
        }
    };

    if (loading) {
        return <CircularProgress />;
    }

    if (error) {
        return <Typography color="error">{error}</Typography>;
    }

    return (
        <Box sx={{ display: "flex", padding: 4 }}>
            <Box>
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

            <Box sx={{ paddingLeft: 4 }}>
                <Timer auctionId={auction ? auction.id : 0} date={auction ? auction.date : ""} />

                <Box sx={{ display: "flex", alignItems: "center", marginTop: 4 }}>
                    {/* Поле для введення суми */}
                    <TextField
                        label="Bet Amount"
                        variant="outlined"
                        type="number"
                        value={betAmount}
                        onChange={(e) => setBetAmount(e.target.value)}
                        sx={{ marginRight: 2 }}
                    />
                    <Button variant="contained" color="primary" onClick={handleBet}>
                        Bet
                    </Button>
                </Box>

                {betError && (
                    <Typography color="error" sx={{ marginTop: 2 }}>
                        {betError}
                    </Typography>
                )}
            </Box>
        </Box>
    );
}
