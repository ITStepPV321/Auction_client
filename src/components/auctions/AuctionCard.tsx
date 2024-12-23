import { useEffect, useState } from "react";
import { AuctionService } from "../../services/auction.service";
import { IAuction } from "../../types/auction";
import { Button, Card, CardActions, CardContent, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function AuctionCard({ id, name, description, price, date }: IAuction) {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    // Функція для переходу на сторінку деталей
    const onDetails = () => {
        navigate(`/details/${id}`); // Перенаправлення на маршрут з id
    };

    const onDelete = async () => {
        try {
            setLoading(true);
            await AuctionService.delete(id);
            window.location.reload(); // Перезавантаження списку після видалення
        } catch (err) {
            setError("Failed to delete the auction.");
        } finally {
            setLoading(false);
        }
    };

    const handleEditClick = () => {
        navigate(`/edit/${id}`);
    };

    return (
        <Card sx={{ boxShadow: 3, padding: 2, transition: "transform 0.3s", "&:hover": { transform: "scale(1.03)" } }}>
            <CardContent>
                <Typography variant="h6" gutterBottom>
                    {name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {description}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {date}
                </Typography>
                <Typography variant="body2" color="text.primary" sx={{ fontWeight: "bold" }}>
                    {price} $
                </Typography>
            </CardContent>
            <CardActions sx={{ justifyContent: "space-between" }}>
                <Button size="small" color="primary" onClick={onDetails}>
                    Details
                </Button>
                <Button className="error" size="small" color="error" onClick={onDelete} disabled={loading}>
                    {loading ? "Deleting..." : "Delete"}
                </Button>
            </CardActions>
            {error && (
                <Typography color="error" sx={{ textAlign: "center", marginTop: 1 }}>
                    {error}
                </Typography>
            )}
        </Card>
    );
}
