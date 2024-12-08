import { useEffect, useState } from "react";
import { ITimerProps } from "../../types/auction";
import { IMaxBet } from "../../types/betHistory";
import { BetHistoryService } from "../../services/betHistory.service";

export default function Timer({ auctionId, date }: ITimerProps) {
    const [maxBet, setMaxBet] = useState<IMaxBet>({
        bet: 0,
        userName: "Nobody",
        date: new Date("01/01/2020").toISOString(),
    });
    const [newDate, setNewDate] = useState(new Date(date).getTime());
    const [endDate, setEndDate] = useState(newDate + 30000);
    const [seconds, setSeconds] = useState<number>(30); // Початкові секунди
    const [secsStyle, setSecsStyle] = useState({});

    useEffect(() => {
        let intervalId: NodeJS.Timeout;
        const now = Date.now();

        if (endDate > now) {
            intervalId = setInterval(() => {
                const now = Date.now();
                const updatedDistance = endDate - now;

                console.log(now.toLocaleString());
                console.log(endDate.toLocaleString());

                if (updatedDistance <= 0) {
                    clearInterval(intervalId);
                    setSeconds(0);
                } else {
                    const newSeconds = Math.floor((updatedDistance % (1000 * 60)) / 1000);
                    setSeconds(newSeconds);
                    setSecsStyle({
                        strokeDashoffset: `${440 - (440 * newSeconds) / 30}`,
                        transition: "all 1s linear 0s",
                    });
                }
            }, 1000);
        }

        return () => clearInterval(intervalId);
    }, [endDate]); // Слідкуємо лише за `endDate`

    useEffect(() => {
        const fetchMaxBet = async () => {
            const curMaxBet = await BetHistoryService.getMaxBet(auctionId);
            if (curMaxBet.bet !== undefined) {
                setMaxBet(curMaxBet);
                const newBetTime = new Date(curMaxBet.date).getTime();
                setNewDate(newBetTime);
                setEndDate(newBetTime + 30000);
            }
        };

        fetchMaxBet();
        const maxBetInterval = setInterval(fetchMaxBet, 1000);

        return () => clearInterval(maxBetInterval);
    }, [auctionId]);

    useEffect(() => {
        setSecsStyle({
            transition: "none",
        });
    }, [newDate]);

    return (
        <div className="timer">
            <div className="circle">
                <svg>
                    <circle cx="70" cy="70" r="70"></circle>
                    <circle cx="70" cy="70" r="70" id="secs" style={secsStyle}></circle>
                </svg>
                <div className="info">
                    <div className="bet">${maxBet.bet}</div>
                    <div className="userName">{maxBet.userName}</div>
                </div>
            </div>
        </div>
    );
}
