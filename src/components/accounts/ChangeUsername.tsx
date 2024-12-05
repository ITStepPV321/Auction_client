import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { IChangeUsername, IUser } from "../../types/user";
import { AuthService } from "../../services/auth.service";
import { Box, Button, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";

export default function ChangeUsername() {
    const [user, setUser] = useState<IUser>();

    useEffect(() => {
        const fetchUser = async () => {
            const result = await AuthService.get();

            setUser(result);
        };

        fetchUser();
    }, []);

    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm<IChangeUsername>();

    const onSubmit = async (user: IChangeUsername) => {
        try {
            await AuthService.changeUsername(user);

            navigate("/profile");
        } catch (err: any) {
            const error = err.response?.data.message;

            setValue("username", user.username);

            alert(error);
        }
    };

    return (
        <Box sx={{ padding: 4 }} className="ChangeUsername">
            <Typography variant="h4" sx={{ marginBottom: 3, textAlign: "center" }}>
                Changing Username
            </Typography>
            <Box sx={{ width: "100%" }}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <TextField
                        required
                        {...register("username")}
                        id="username"
                        label="username"
                        type="username"
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
