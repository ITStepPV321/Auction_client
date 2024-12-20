import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { IChangePassword } from "../../types/user";
import { AuthService } from "../../services/auth.service";
import { Box, Button, TextField, Typography } from "@mui/material";

export default function ChangePassword() {
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<IChangePassword>();

    const onSubmit = async (user: IChangePassword) => {
        try {
            await AuthService.changePassword(user);

            navigate("/profile");
        } catch (err: any) {
            const error = err.response?.data.message;

            alert(error);
        }
    };

    return (
        <Box sx={{ padding: 4 }} className="ChangePassword">
            <Typography variant="h4" sx={{ marginBottom: 3, textAlign: "center" }}>
                Changing Password
            </Typography>

            <Box sx={{ width: "100%" }}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <TextField
                        required
                        {...register("oldPassword")}
                        id="oldPassword"
                        label="oldPassword"
                        type="oldPassword"
                        variant="filled"
                    />
                    <TextField
                        required
                        {...register("newPassword")}
                        id="newPassword"
                        label="newPassword"
                        type="newPassword"
                        variant="filled"
                    />
                    <TextField
                        required
                        {...register("repeatPassword")}
                        id="repeatPassword"
                        label="repeatPassword"
                        type="repeatPassword"
                        variant="filled"
                    />
                    <Button variant="contained" type="submit">
                        Save
                    </Button>
                </form>
            </Box>
        </Box>
    );
}
