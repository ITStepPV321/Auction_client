import { AppBar, Button, Stack, Toolbar, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

export default function Header() {
    const { token, logout } = useAuth();

    return (
        <AppBar>
            <Toolbar>
                <Typography variant="h6" component={Link} to="/" sx={{ flexGrow: 1 }}>
                    Auctions Online Client
                </Typography>

                <Stack direction={"row"} spacing={2}>
                    {!token ? (
                        <>
                            <Button className="nav-button" component={Link} to="/login">
                                Login
                            </Button>

                            <Button className="nav-button" component={Link} to="/registration">
                                Register
                            </Button>
                        </>
                    ) : (
                        <>
                            <Button className="nav-button" component={Link} to="/profile">
                                My Profile
                            </Button>

                            <Button className="nav-button" component={Link} to="/login" onClick={logout}>
                                Logout
                            </Button>
                        </>
                    )}
                </Stack>
            </Toolbar>
        </AppBar>
    );
}
