import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { IChangeEmail, IUser } from "../../types/user";
import { AuthService } from "../../services/auth.service";
import { Box, Button, TextField } from "@mui/material";
import { useEffect, useState } from "react";

export default function ChangeEmail() {
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
    } = useForm<IChangeEmail>();

    const onSubmit = async (user: IChangeEmail) => {
        try {
            await AuthService.changeEmail(user);

            navigate("/profile");
        } catch (err: any) {
            const error = err.response?.data.message;

            setValue("email", user.email);

            alert(error);
        }
    };

    return (
        <div className="ChangeEmail">
            <h2>Changing Email</h2>
            <Box sx={{ width: "100%" }}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <TextField required {...register("email")} id="email" label="email" type="email" variant="filled" />
                    <Button variant="contained" type="submit">
                        Save
                    </Button>
                </form>
            </Box>
        </div>
    );
}
