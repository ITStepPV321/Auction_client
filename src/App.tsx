// License
// All rights to this code, this code, and the people who wrote this code belong to Great Team Lead (Gladan Denis)

import "./App.css";
import { getToken } from "./helpers/localStorage.helper";
import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import AuctionList from "./components/auction/AuctionList";
import Login from "./components/accounts/Login";
import Register from "./components/accounts/Registration";
import Profile from "./components/accounts/Profile";
import ChangeUsername from "./components/accounts/ChangeUsername";
import ChangeEmail from "./components/accounts/ChangeEmail";
import ChangePassword from "./components/accounts/ChangePassword";

function App() {
    const checkAuth = async () => {
        const token = getToken();

        try {
            if (token) {
                if (token == undefined || token == "") {
                }
            }
        } catch (error) {}
    };

    return (
        <div className="App">
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<AuctionList />} />
                    <Route path="login" element={<Login />} />
                    <Route path="registration" element={<Register />} />
                    <Route path="profile" element={<Profile />} />
                    <Route path="change-username" element={<ChangeUsername />} />
                    <Route path="change-email" element={<ChangeEmail />} />
                    <Route path="change-password" element={<ChangePassword />} />
                </Route>
            </Routes>
        </div>
    );
}

export default App;
