import { Link, Outlet } from "react-router-dom";
import { AuthService } from "../services/auth.service";

export default function Layout() {
    const logout = () => {
        AuthService.logout();
    };

    return (
        <>
            <header>
                <Link to="/">Auctions</Link>
                <Link to="/login">Login</Link>
                <Link to="/registration">Register</Link>
                <Link to="/login" onClick={logout}>
                    Logout
                </Link>
                <Link to="/profile">My Profile</Link>
            </header>
            <main>
                <Outlet />
            </main>
        </>
    );
}
