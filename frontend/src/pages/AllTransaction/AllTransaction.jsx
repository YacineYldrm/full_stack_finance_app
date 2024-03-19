import "./AllTransaction.scss";
import logo from "../../../public/Logo.svg";
import incomeIcon from "../../../public/incomeIcon.svg";
import expenseIcon from "../../../public/expenseIcon.svg";
import { useEffect, useState } from "react";
import TransactionDay from "../../components/TransactionDay/TransactionDay";
import ModalAllTransaction from "../../components/ModalAllTransaction/ModalAllTransaction";

import magnifire from "../../../public/magnifire.svg";
import calendar from "../../../public/calendar.svg";
import Navbar from "../../components/Navbar/Navbar";
import { mediaUrl } from "../../api";
import { useLocation, useNavigate } from "react-router-dom";

const AllTransaction = ({ provider }) => {
    const [expenseTotal, setExpenseTotal] = useState(0);
    const [incomeTotal, setIncomeTotal] = useState(0);
    const [allDates, setAllDates] = useState([]);
    const [dates, setDates] = useState([]);
    const [modal, setModal] = useState(false);
    const navigate = useNavigate();

    // #################################################

    useEffect(() => {
        const slicedCardsArrayStartToActive = provider?.accounts?.slice(
            provider?.activeCard
        );
        const slicedCardsArrayActiveToEnd = provider?.accounts?.slice(
            0,
            provider?.activeCard
        );
        const newAccountsArray = [
            ...slicedCardsArrayStartToActive,
            ...slicedCardsArrayActiveToEnd,
        ];
        provider?.setAccounts(newAccountsArray);
        provider?.setCardIndex(0);
    }, []);

    // #################################################

    const getDates = () => {
        let updatedDates = [];
        provider.account?.transactions?.forEach((transaction) => {
            const newdate = new Date(
                transaction.date - new Date().getTimezoneOffset() * 60000
            )
                .toISOString()
                .slice(0, 10);
            updatedDates = [...updatedDates, newdate];
        });
        setAllDates(updatedDates);
    };

    // #################################################

    useEffect(() => {
        setDates([...new Set(allDates)]);
    }, [allDates]);

    // #################################################

    useEffect(() => {
        getDates();
        const incomes = provider.account?.transactions?.filter(
            (transaction) => transaction.type === "income"
        );
        const expenses = provider.account?.transactions?.filter(
            (transaction) => transaction.type === "expense"
        );
        setIncomeTotal(incomes?.reduce((acc, curr) => acc + curr.amount, 0));
        setExpenseTotal(expenses?.reduce((acc, curr) => acc + curr.amount, 0));
    }, [provider.account]);

    // #################################################

    return (
        <>
            {modal ? (
                <ModalAllTransaction
                    transactions={provider.account?.transactions}
                    modal={modal}
                    setModal={setModal}
                    provider={provider}
                />
            ) : null}

            {modal ? null : (
                <main className="all_transactions_main">
                    <section>
                        <div className="userInfo">
                            <img src={logo} alt="finco logo" />
                            <img
                                onClick={() => navigate("/menu")}
                                src={`${mediaUrl}${provider.activeUser?.profileImage}`}
                                alt=""
                            />
                        </div>
                    </section>
                    <div className="titleBar">
                        <h1>All transactions</h1>
                        <div>
                            <div>
                                <img
                                    src={magnifire}
                                    alt="search"
                                    onClick={() => setModal(true)}
                                />
                            </div>
                            <div>
                                <img
                                    src={calendar}
                                    alt="calendar"
                                    onClick={() => setModal(true)}
                                />
                            </div>
                        </div>
                    </div>
                    <div>
                        <article>
                            <div>
                                <img src={incomeIcon} alt="income icon" />
                            </div>
                            <div>
                                <p>Income</p>
                                <h2>
                                    {incomeTotal?.toLocaleString("de-DE", {
                                        style: "currency",
                                        currency: "EUR",
                                    })}
                                </h2>
                            </div>
                        </article>
                        <article>
                            <div>
                                <img src={expenseIcon} alt="expense icon" />
                            </div>
                            <div>
                                <p>Expense</p>
                                <h2>
                                    {expenseTotal?.toLocaleString("de-DE", {
                                        style: "currency",
                                        currency: "EUR",
                                    })}
                                </h2>
                            </div>
                        </article>
                    </div>
                    <section>
                        {dates
                            ?.sort()
                            .reverse()
                            .map((date, i) => (
                                <TransactionDay
                                    provider={provider}
                                    date={date}
                                    key={i}
                                    transactions={
                                        provider.account?.transactions
                                    }
                                />
                            ))}
                    </section>
                </main>
            )}

            {modal ? null : <Navbar provider={provider} />}
        </>
    );
};

export default AllTransaction;
