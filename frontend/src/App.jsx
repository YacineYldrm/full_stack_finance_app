import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.scss";
import Home from "./pages/Home/Home";
import Register from "./pages/Register/Register";
import SetupAccount from "./pages/SetupAccount/SetupAccount";
import Navbar from "./components/Navbar/Navbar";

function App() {
    const [authorization, setAuthorizsation] = useState("");
    const [activeUser, setActiveUser] = useState("");
    const [accounts, setAcconts] = useState([]);
    const [account, setAccont] = useState({});
    const [transactions, setTransactions] = useState([]);

    const provider = {
        authorization,
        setAuthorizsation,
        activeUser,
        setActiveUser,
        accounts,
        setAcconts,
        account,
        setAccont,
        transactions,
        setTransactions,
    };

    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Home provider={provider} />} />

                    <Route
                        path="/register"
                        element={<Register provider={provider} />}
                    />
                    <Route
                        path="/account/setup"
                        element={<SetupAccount provider={provider} />}
                    />
                </Routes>
                <Navbar />
            </BrowserRouter>
        </>
    );
}

export default App;
