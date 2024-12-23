import { Box, Button, TextField, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { ICreateAuction } from "../../types/auction";
import { AuctionService } from "../../services/auction.service";

export default function CreateAuction() {
    const navigate = useNavigate();

    // Ініціалізація React Hook Form
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<ICreateAuction>();

    // Обробка відправки форми
    const onSubmit = async (auction: ICreateAuction) => {
        try {
            const formattedAuction = {
                ...auction,
                date: new Date(auction.date).toISOString(),
                //price: Number(auction.price),
            };

            console.log("Formatted Auction:", formattedAuction);

            await AuctionService.create(formattedAuction);
            navigate("/");
        } catch (error: any) {
            console.error("Failed to create auction:", error.toJSON ? error.toJSON() : error);
            alert("An error occurred while creating the auction.");
        }
    };

    return (
        <Box className="form">
            <Typography variant="h4" sx={{ marginBottom: 2, textAlign: "center" }}>
                Create New Auction
            </Typography>
            <form onSubmit={handleSubmit(onSubmit)} style={{ width: "100%", maxWidth: "400px" }}>
                {/* Name Field */}
                <TextField
                    {...register("name", { required: "Name is required" })}
                    error={!!errors.name}
                    helperText={errors.name?.message}
                    id="name"
                    label="Name"
                    variant="outlined"
                    fullWidth
                    sx={{ marginBottom: 2 }}
                />

                {/* Description Field */}
                <TextField
                    {...register("description", { required: "Description is required" })}
                    error={!!errors.description}
                    helperText={errors.description?.message}
                    id="description"
                    label="Description"
                    variant="outlined"
                    multiline
                    rows={3}
                    fullWidth
                    sx={{ marginBottom: 2 }}
                />

                {/* Date Field */}
                <TextField
                    {...register("date", { required: "Date is required" })}
                    error={!!errors.date}
                    helperText={errors.date?.message}
                    id="date"
                    label="Date"
                    type="datetime-local"
                    variant="outlined"
                    fullWidth
                    sx={{ marginBottom: 2 }}
                    InputLabelProps={{ shrink: true }}
                />

                {/* Year Field */}
                <TextField
                    {...register("year", { required: "Year is required" })}
                    error={!!errors.year}
                    helperText={errors.year?.message}
                    id="year"
                    label="Year"
                    type="number"
                    variant="outlined"
                    fullWidth
                    sx={{ marginBottom: 2 }}
                    InputLabelProps={{ shrink: true }}
                />

                {/* Price Field */}
                <TextField
                    {...register("price", {
                        required: "Price is required",
                        pattern: {
                            value: /^\d+(\.\d{1,2})?$/,
                            message: "Invalid price format",
                        },
                    })}
                    error={!!errors.price}
                    helperText={errors.price?.message}
                    id="price"
                    label="Price"
                    type="number"
                    variant="outlined"
                    fullWidth
                    sx={{ marginBottom: 2 }}
                />

                {/* Submit Button */}
                <Button variant="contained" type="submit" fullWidth disabled={isSubmitting}>
                    {isSubmitting ? "Creating..." : "Create"}
                </Button>
            </form>
        </Box>
    );
}
