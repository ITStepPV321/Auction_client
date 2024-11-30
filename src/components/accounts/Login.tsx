import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { ILogin } from "../../types/user";
import { AuthService } from "../../services/auth.service";
import { setToken } from "../../helpers/localStorage.helper";
import { Box, Button, TextField } from "@mui/material";

export default function Login() {
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<ILogin>();

    const onSubmit = async (user: ILogin) => {
        try {
            const token = await AuthService.login(user);

            if (token) {
                setToken(token);
                navigate("/auctions");
            }
        } catch (err: any) {
            const error = err.response?.data.message;

            alert(error);
        }
    };

    return (
        <>
            <div className="Login">
                <h2>Login</h2>
                <Box sx={{ width: "100%" }}>
                    <form onSubmit={handleSubmit(onSubmit)}>
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
                            Login
                        </Button>
                    </form>
                </Box>
            </div>
        </>
    );
}
