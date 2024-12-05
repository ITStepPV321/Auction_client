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
            <Box sx={{ padding: 4 }} className="Register">
                <Typography variant="h4" sx={{ marginBottom: 3, textAlign: "center" }}>
                    Register
                </Typography>

                <Box>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <TextField
                            required
                            {...register("username")}
                            id="username"
                            label="username"
                            type="username"
                            variant="filled"
                        />
                        <TextField
                            required
                            {...register("email")}
                            id="email"
                            label="email"
                            type="email"
                            variant="filled"
                        />
                        <TextField
                            required
                            {...register("password")}
                            id="password"
                            label="password"
                            type="password"
                            variant="filled"
                        />
                        <Button variant="contained" type="submit">
                            Register
                        </Button>
                    </form>
                </Box>
            </Box>
        </>
    );
}
