import { useEffect, useState } from "react";
import { ICountDownProps } from "../../../types/auction";

export default function Countdown({ date }: ICountDownProps) {
    const endDate = new Date(date).getTime();
    const [days, setDays] = useState<string | number>("00");
    const [hours, setHours] = useState<string | number>("00");
    const [minutes, setMinutes] = useState<string | number>("00");
    const [seconds, setSeconds] = useState<string | number>("00");

    useEffect(() => {
        const intervalId = setInterval(() => {
            let now = new Date().getTime();
            let distance = endDate - now;

            console.log(endDate);

            setDays(Math.floor(distance / (1000 * 60 * 60 * 24)));
            setHours(Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)));
            setMinutes(Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)));
            setSeconds(Math.floor((distance % (1000 * 60)) / 1000));
        }, 1000);
    }, []);

    return (
        <div>
            <p className="countdown-ttl">Auction Starts At:</p>

            <div className="countdown-container">
                <img className="icon" src="https://img.icons8.com/?size=100&id=19099&format=png&color=007bff" />
                <div className="tick-container">
                    <div className="tick-info">
                        <p className="tick-lbl">{days}</p>
                    </div>
                    <p className="tick-ttl">Days</p>
                </div>
                <div className="tick-container">
                    <div className="tick-info">
                        <p className="tick-lbl">{hours}</p>
                    </div>
                    <p className="tick-ttl">Hrs</p>
                </div>
                <div className="tick-container">
                    <div className="tick-info">
                        <p className="tick-lbl">{minutes}</p>
                    </div>
                    <p className="tick-ttl">Min</p>
                </div>
                <div className="tick-container">
                    <div className="tick-info">
                        <p className="tick-lbl">{seconds}</p>
                    </div>
                    <p className="tick-ttl">Sec</p>
                </div>
            </div>
        </div>
    );
}
