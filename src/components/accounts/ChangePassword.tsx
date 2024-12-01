import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { IChangePassword } from "../../types/user";
import { AuthService } from "../../services/auth.service";
import { Box, Button, TextField } from "@mui/material";

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
        <div className="ChangePassword">
            <h2>Changing Password</h2>
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
                        {...register("repeatNewPassword")}
                        id="repeatNewPassword"
                        label="repeatNewPassword"
                        type="repeatNewPassword"
                        variant="filled"
                    />
                    <Button variant="contained" type="submit">
                        Save
                    </Button>
                </form>
            </Box>
        </div>
    );
}
