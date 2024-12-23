import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { IRegister } from "../../types/user";
import { AuthService } from "../../services/auth.service";
import { Box, Button, TextField, Typography } from "@mui/material";

export default function Register() {
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<IRegister>();

    const onSubmit = async (user: IRegister) => {
        try {
            await AuthService.register(user);

            navigate("/login");
        } catch (err: any) {
            const error = err.response?.data.message;

            alert(error);
        }
    };

    return (
        <>
            <Box className="form">
                <Typography variant="h4" sx={{ marginBottom: 3, textAlign: "center" }}>
                    Register
                </Typography>

                <form onSubmit={handleSubmit(onSubmit)} style={{ width: "100%", maxWidth: "400px" }}>
                    <TextField
                        required
                        {...register("username")}
                        id="username"
                        label="username"
                        type="username"
                        variant="filled"
                        fullWidth
                        sx={{ marginBottom: 2 }}
                    />
                    <TextField
                        required
                        {...register("email")}
                        id="email"
                        label="email"
                        type="email"
                        variant="filled"
                        fullWidth
                        sx={{ marginBottom: 2 }}
                    />
                    <TextField
                        required
                        {...register("password")}
                        id="password"
                        label="password"
                        type="password"
                        variant="filled"
                        fullWidth
                        sx={{ marginBottom: 2 }}
                    />
                    <Button variant="contained" type="submit" fullWidth>
                        Register
                    </Button>
                </form>
            </Box>
        </>
    );
}
