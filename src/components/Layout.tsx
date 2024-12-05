import { Link, Outlet } from "react-router-dom";
import { AuthService } from "../services/auth.service";
import Header from "./ui/Header";

export default function Layout() {
    const logout = () => {
        AuthService.logout();
    };

    return (
        <>
            <header>
                <Header />
            </header>
            <main>
                <Outlet />
            </main>
        </>
    );
}
