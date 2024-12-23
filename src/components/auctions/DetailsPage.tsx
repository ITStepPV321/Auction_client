import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AuctionService } from "../../services/auction.service";
import { IAuction } from "../../types/auction";
import { Box, Typography, CircularProgress, TextField, Button } from "@mui/material";
import Timer from "./Timers/Timer";
import { BetHistoryService } from "../../services/betHistory.service";
import { ICreateBet } from "../../types/betHistory";
import Countdown from "./Timers/Countdown";

export default function DetailsPage() {
    const { id } = useParams<{ id: string }>(); // Отримання id з маршруту
    const [auction, setAuction] = useState<IAuction | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [betAmount, setBetAmount] = useState<number | string>("");
    const [recBetAmount, setRecBetAmount] = useState<number | string>("");
    const [betError, setBetError] = useState<string | null>(null); // Помилка для перевірки суми
    const [timerType, setTimerType] = useState(-1);

    useEffect(() => {
        const fetchAuction = async () => {
            try {
                setLoading(true);
                const fetchedAuction = await AuctionService.getUserWonAuction(Number(id));
                setAuction(fetchedAuction);

                const maxBet = await BetHistoryService.getMaxBet(fetchedAuction.id);

                if (!isNaN(maxBet.bet)) {
                    setBetAmount(maxBet.bet);
                    setRecBetAmount(maxBet.bet + 50);
                } else {
                    setBetAmount(fetchedAuction.price);
                    setRecBetAmount(fetchedAuction.price);
                }
            } catch (err) {
                console.error("Error fetching auction:", err);
                setError("Failed to load auction details.");
            } finally {
                setLoading(false);
            }
        };

        fetchAuction();
    }, [id]);

    useEffect(() => {
        const intervalId = setInterval(async () => {
            if (auction != null) {
                const maxBet = await BetHistoryService.getMaxBet(auction.id);
                let auctionTime = new Date(auction!.date).getTime();
                const currentTime = new Date().getTime();

                if (!isNaN(maxBet.bet)) {
                    auctionTime = new Date(maxBet.date).getTime();
                }

                if (auctionTime > currentTime) {
                    setTimerType(0);
                } else if (auctionTime > currentTime - 30000) {
                    setTimerType(1);
                } else {
                    setTimerType(-1);
                }
            }
        }, 300);

        return () => clearInterval(intervalId);
    }, [auction]);

    const handleBet = async () => {
        const maxBet = await BetHistoryService.getMaxBet(auction ? auction.id : 0);

        console.log("Bet button clicked!"); // Лог для перевірки
        if (!auction) return;

        const currentPrice = maxBet.bet ? maxBet.bet : auction.price;

        if (Number(recBetAmount) <= currentPrice) {
            setBetError(`Bet amount must be greater than ${currentPrice} $`);
            return;
        }

        try {
            console.log("Updating auction with bet amount:", recBetAmount); // Лог для дебагу

            const bet: ICreateBet = {
                bet: Number(recBetAmount),
                userId: "string",
                auctionId: auction?.id,
                date: new Date().toISOString(),
            };

            await BetHistoryService.makeBet(bet);
            setBetAmount(bet.bet);
            setRecBetAmount(bet.bet + 50);

            setBetError(null);
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
        <Box className="auction-container">
            <Box>
                <p className="auction-desc">{auction?.description}</p>
            </Box>

            <Box sx={{ paddingLeft: 4 }}>
                <h1 className="auction-ttl">{auction?.name}</h1>
                <p className="auction-id">Auction Id: {auction?.id}</p>
                <p className="auction-start-date">Auction Start Date: {new Date(auction!.date).toLocaleString()}</p>

                {timerType == 0 ? (
                    <Countdown date={auction ? auction.date : ""} />
                ) : timerType == 1 ? (
                    <Timer auctionId={auction ? auction.id : 0} date={auction ? auction.date : ""} />
                ) : (
                    <p>Auction Ended</p>
                )}

                <div className="auction-divider start"></div>

                <p className="started-price ttl">Started Price: ${auction?.price}</p>
                <p className="current-price ttl">Current Price: ${betAmount}</p>

                <div className="auction-divider end"></div>

                {timerType == 1 ? (
                    <Box sx={{ display: "flex", alignItems: "center", marginTop: 4 }}>
                        <TextField
                            label="Bet Amount"
                            variant="outlined"
                            type="number"
                            value={recBetAmount}
                            onChange={(e) => setRecBetAmount(e.target.value)}
                            sx={{ marginRight: 2 }}
                        />
                        <Button className="make-bet-btn" variant="contained" color="primary" onClick={handleBet}>
                            Bet
                        </Button>
                    </Box>
                ) : null}

                {betError && (
                    <Typography color="error" sx={{ marginTop: 2 }}>
                        {betError}
                    </Typography>
                )}
            </Box>
        </Box>
    );
}
