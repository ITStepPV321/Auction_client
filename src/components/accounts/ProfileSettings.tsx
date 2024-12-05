import { useNavigate } from "react-router-dom";
import { AuthService } from "../../services/auth.service";
import { removeToken } from "../../helpers/localStorage.helper";
import { Button, Container, Stack, Typography } from "@mui/material";

export default function ProfileSettings() {
    const navigate = useNavigate();

    const onChangeUsername = () => {
        navigate("/change-username");
    };

    const onChangeEmail = () => {
        navigate("/change-email");
    };

    const onChangePassword = () => {
        navigate("/change-password");
    };

    const onDelete = () => {
        AuthService.delete();
        removeToken();

        navigate("/login");
    };

    return (
        <>
            <Container className="danger-zone">
                <Typography variant="h5" sx={{ marginBottom: 3, textAlign: "center" }}>
                    Danger Zone:
                </Typography>
                <Stack direction="column" spacing={2} sx={{ marginBottom: 2 }}>
                    <Stack direction="row" justifyContent="space-between" alignItems="center">
                        <Typography variant="h6">Change Username</Typography>
                        <Button className="error" variant="contained" color="error" onClick={onChangeUsername}>
                            Change
                        </Button>
                    </Stack>
                    <Stack direction="row" justifyContent="space-between" alignItems="center">
                        <Typography variant="h6">Change Email</Typography>
                        <Button className="error" variant="contained" color="error" onClick={onChangeEmail}>
                            Change
                        </Button>
                    </Stack>
                    <Stack direction="row" justifyContent="space-between" alignItems="center">
                        <Typography variant="h6">Change Password</Typography>
                        <Button className="error" variant="contained" color="error" onClick={onChangePassword}>
                            Change
                        </Button>
                    </Stack>
                    <Stack direction="row" justifyContent="space-between" alignItems="center">
                        <Typography variant="h6">Delete Profile</Typography>
                        <Button className="error" variant="contained" color="error" onClick={onDelete}>
                            Delete
                        </Button>
                    </Stack>
                </Stack>
            </Container>
        </>
    );
}
