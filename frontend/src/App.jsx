import { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.scss";
import Home from "./pages/Home/Home";
import Register from "./pages/Register/Register";
import SetupAccount from "./pages/SetupAccount/SetupAccount";
import Login from "./pages/Login/Login";
import { silentRefresh } from "./utils/refresh";
import AddIncome from "./pages/AddIncome/AddIncome";
import AddExpense from "./pages/AddExpense/AddExpense";
import AllTransaction from "./pages/AllTransaction/AllTransaction";
import Reports from "./pages/Reports/Reports";
import getAllAccounts from "./utils/getAllAccounts";
import Verify from "./pages/Verify/Verify";
import Menu from "./pages/Menu/Menu";
import calcTotal from "./utils/calcTotal";
import Settings from "./pages/Settings/Settings";
import MyWallet from "./pages/MyWallet/MyWallet";
import ForgotPassword from "./pages/ForgotPassword/ForgotPassword";
import ResetPassword from "./pages/ResetPassword/ResetPassword";
import Onboard from "./pages/Onboard/Onboard";
import GetStarted from "./pages/GetStarted/GetStarted";
import Splash from "./pages/Splash/Splash";

function App() {
    // #################################################
    const [authorization, setAuthorization] = useState(null);
    const [activeUser, setActiveUser] = useState("");
    const [accounts, setAccounts] = useState([]);
    const [account, setAccount] = useState(null);
    const [transactions, setTransactions] = useState([]);
    const [cardIndex, setCardIndex] = useState(0);
    const [expenseTotal, setExpenseTotal] = useState(0);
    const [incomeTotal, setIncomeTotal] = useState(0);
    const [monthlyIncome, setMonthlyIncome] = useState(null);
    const [monthlyExpense, setMonthlyExpense] = useState(null);

    const provider = {
        authorization,
        setAuthorization,
        activeUser,
        setActiveUser,
        accounts,
        setAccounts,
        account,
        setAccount,
        transactions,
        setTransactions,
        cardIndex,
        setCardIndex,
        expenseTotal,
        setExpenseTotal,
        incomeTotal,
        setIncomeTotal,
        monthlyIncome,
        setMonthlyIncome,
        monthlyExpense,
        setMonthlyExpense,
    };

    // ############### Refresh Token on pagereload ###############

    useEffect(() => {
        if (!authorization)
            silentRefresh(null, setAuthorization, setActiveUser);
    }, []);

    useEffect(() => {
        if (provider.authorization) getAllAccounts(provider);
    }, [authorization]);

    // #################################################

    useEffect(() => {
        if (account) calcTotal(account, provider);
    }, [incomeTotal, expenseTotal]);

    // #################################################

    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route
                        path="/home"
                        element={<Home provider={provider} />}
                    />

                    <Route
                        path="/register"
                        element={<Register provider={provider} />}
                    />
                    <Route
                        path="/account/setup"
                        element={<SetupAccount provider={provider} />}
                    />
                    <Route
                        path="/login"
                        element={<Login provider={provider} />}
                    />
                    <Route
                        path="/add-income"
                        element={<AddIncome provider={provider} />}
                    />
                    <Route
                        path="add-expense"
                        element={<AddExpense provider={provider} />}
                    />
                    <Route
                        path="/all-transactions"
                        element={<AllTransaction provider={provider} />}
                    />
                    <Route
                        path="/reports"
                        element={<Reports provider={provider} />}
                    />
                    <Route path="/verify/:userId" element={<Verify />} />
                    <Route
                        path="/menu"
                        element={<Menu provider={provider} />}
                    />
                    <Route
                        path="/menu/settings"
                        element={<Settings provider={provider} />}
                    />
                    <Route
                        path="/menu/my-wallet"
                        element={<MyWallet provider={provider} />}
                    />
                    <Route
                        path="/forgot-password"
                        element={<ForgotPassword />}
                    />
                    <Route
                        path="/reset-password/:resetToken"
                        element={<ResetPassword />}
                    />
                    <Route path="/" element={<Splash />} />
                    <Route path="/onboard" element={<Onboard />} />
                    <Route path="/get-started" element={<GetStarted />} />
                </Routes>
            </BrowserRouter>
        </>
    );
}

export default App;
