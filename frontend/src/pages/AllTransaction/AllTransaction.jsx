import "./AllTransaction.scss";
import logo from "../../../public/logo.png";
import incomeIcon from "../../../public/incomeIcon.svg";
import expenseIcon from "../../../public/expenseIcon.svg";
import { useEffect, useState } from "react";
import TransactionDay from "../../components/TransactionDay/TransactionDay";
import { backendUrl } from "../../api";
import ModalAllTransaction from "../../components/ModalAllTransaction/ModalAllTransaction";
import getAllAccounts from "../../utils/getAllAccounts";
import Navbar from "../../components/Navbar/Navbar";

const AllTransaction = ({ provider }) => {
    const [expenseTotal, setExpenseTotal] = useState(0);
    const [incomeTotal, setIncomeTotal] = useState(0);
    const [allDates, setAllDates] = useState([]);
    const [dates, setDates] = useState([]);
    const [modal, setModal] = useState(false);

    // #################################################

    // #################################################

    useEffect(() => {
        if (provider.authorization) getAllAccounts(provider);
    }, [provider.authorization]);

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
                    transactions={provider.account.transactions}
                    modal={modal}
                    setModal={setModal}
                    provider={provider}
                />
            ) : null}
            <header>
                <img src={logo} alt="finco logo" />
                <img
                    src={`http://localhost:3001/${provider.activeUser.profileImage}`}
                    alt="profile Image"
                />
            </header>
            <main className="all_transactions_main">
                <div>
                    <h1>All transactions</h1>
                    <div>
                        <img
                            src=""
                            alt="search"
                            onClick={() => setModal(true)}
                        />
                        <img
                            src=""
                            alt="calendar"
                            onClick={() => setModal(true)}
                        />
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
                                date={date}
                                key={i}
                                transactions={provider.account.transactions}
                            />
                        ))}
                </section>
            </main>
            <Navbar />
        </>
    );
};

export default AllTransaction;
