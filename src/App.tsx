import "./App.css";
import { getToken } from "./helpers/localStorage.helper";
import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import AuctionList from "./components/auctions/AuctionList";
import Login from "./components/accounts/Login";
import Register from "./components/accounts/Registration";
import Profile from "./components/accounts/Profile";
import ChangeUsername from "./components/accounts/ChangeUsername";
import ChangeEmail from "./components/accounts/ChangeEmail";
import ChangePassword from "./components/accounts/ChangePassword";
import CreateAuction from "./components/auctions/CreateAuction";
import DetailsPage from "./components/auctions/DetailsPage";
import CreateInvoiceCard from "./components/auctions/CreateInvoiceCard";
import InvoiceCard from "./components/invoices/InvoiceCard";

function App() {
    const checkAuth = async () => {
        const token = getToken();

        try {
            if (token) {
                if (token === undefined || token === "") {
                    // Handle invalid token case if needed
                }
            }
        } catch (error) {
            console.error("Authentication error:", error);
        }
    };

    return (
        <div className="app">
            <Routes>
                <Route path="/" element={<Layout />}>
                    {/* Всі маршрути повинні бути тут, без вкладених <Routes> */}
                    <Route index element={<AuctionList />} />
                    <Route path="create-auction" element={<CreateAuction />} />
                    <Route path="/details/:id" element={<DetailsPage />} /> {/* Новий маршрут */}
                    <Route path="login" element={<Login />} />
                    <Route path="registration" element={<Register />} />
                    <Route path="profile" element={<Profile />} />
                    <Route path="change-username" element={<ChangeUsername />} />
                    <Route path="change-email" element={<ChangeEmail />} />
                    <Route path="change-password" element={<ChangePassword />} />
                    <Route path="create-invoice/:auctionId" element={<CreateInvoiceCard />} />
                    <Route path="invoice/:id" element={<InvoiceCard />} />
                </Route>
            </Routes>
        </div>
    );
}

export default App;
