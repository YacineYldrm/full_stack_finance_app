import Navbar from "../../components/Navbar/Navbar";
import "./Home.scss";
import { useEffect, useState } from "react";
import { backendUrl } from "../../api";
import incomeIcon from "../../../public/incomeIcon.svg";
import expenseIcon from "../../../public/expenseIcon.svg";
import limitIcon from "../../../public/limitIcon.svg";
import getAllAccounts from "../../utils/getAllAccounts";
import Card from "../../components/Card/Card";

const Home = ({ provider }) => {
    const [index, setIndex] = useState(0);
    const [expenseTotal, setExpenseTotal] = useState(0);
    const [incomeTotal, setIncomeTotal] = useState(0);
    const [limit, setLimit] = useState(0);
    const [percentage, setPercentage] = useState(0);
    const [message, setMessage] = useState(null);

    useEffect(() => {
        if (provider.authorization) getAllAccounts(backendUrl, provider);
    }, [provider.authorization]);

    useEffect(() => {
        const incomes = provider.account?.transactions?.filter(
            (transaction) => transaction.type === "income"
        );
        const expenses = provider.account?.transactions?.filter(
            (transaction) => transaction.type === "expense"
        );
        setIncomeTotal(incomes?.reduce((acc, curr) => acc + curr.amount, 0));
        setExpenseTotal(expenses?.reduce((acc, curr) => acc + curr.amount, 0));
    }, [provider.account]);

    useEffect(() => {
        if (provider.accounts.length > index)
            provider.setAccount(provider.accounts[index]);
        else setIndex(0);
    }, [index]);

    useEffect(() => {
        if (incomeTotal < limit) {
            setPercentage(100);
        } else setPercentage((Number(limit) / Number(incomeTotal)) * 100);
    }, [limit]);

    useEffect(() => {
        setLimit(Number((incomeTotal * percentage) / 100).toFixed(0));
    }, [percentage]);

    const toggleModal = () => {
        const modal = document.getElementById("modal");
        modal.classList.toggle("show_modal");
    };

    const submitLimit = async () => {
        const response = await fetch(`${backendUrl}accounts/edit`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                authorization: provider.authorization,
            },
            body: JSON.stringify({ ...provider.account, limit }),
        });
        const { success, result, error, message } = await response.json();
        if (!success) {
            console.log(error);
            setMessage(message);
        } else {
            console.log(result);
            provider.setAccount(result);
            toggleModal();
        }
    };

    return (
        <>
            <main className="home">
                <div>
                    <div>
                        <p>Welcome back.</p>
                        <h3>{provider.activeUser?.user}</h3>
                    </div>
                    <div className="profile_img_wrapper">
                        <img
                            src={`http://localhost:3001/${provider?.activeUser?.profileImage}`}
                            alt="profile picture."
                        />
                    </div>
                </div>
                <Card account={provider.account} />
                <h4>Total wallet</h4>
                <section>
                    <div>
                        <article>
                            <div>
                                <img src={incomeIcon} alt="income icon" />
                            </div>
                            <p>Income</p>
                            <h2>+ €{incomeTotal?.toLocaleString()},00</h2>
                        </article>
                        <article>
                            <div>
                                <img src={expenseIcon} alt="expense icon" />
                            </div>
                            <p>Expense</p>
                            <h2>- €{expenseTotal?.toLocaleString()},00</h2>
                        </article>
                    </div>
                    <article className="limit_dislpay_wrapper">
                        <div>
                            <img
                                onClick={toggleModal}
                                src={limitIcon}
                                alt="limit icon"
                            />
                        </div>
                        <div>
                            {provider.account?.limit ? (
                                <>
                                    <p>Monthly spending limit</p>
                                    <h2>
                                        €
                                        {provider.account?.limit.toLocaleString()}
                                        ,00
                                    </h2>
                                    <h5> ← Click to edit spending limit.</h5>
                                </>
                            ) : (
                                <>
                                    <p>No monthly spending limit set.</p>
                                    <h5> ← Click to set spending limit.</h5>
                                </>
                            )}
                        </div>
                    </article>
                </section>

                <div
                    onClick={() => {
                        event.target === document.getElementById("modal") &&
                            (toggleModal(), setPercentage(0));
                    }}
                    id="modal"
                    className="limit_editor"
                >
                    <article>
                        <form>
                            <label>
                                <p>€</p>
                                <input
                                    onChange={(e) => setLimit(e.target.value)}
                                    value={
                                        limit > incomeTotal
                                            ? incomeTotal
                                            : limit
                                    }
                                    type="number"
                                />
                            </label>
                            <label>
                                <input
                                    defaultValue={0}
                                    value={percentage ? percentage : 0}
                                    onChange={(e) =>
                                        setPercentage(e.target.value)
                                    }
                                    type="range"
                                    min={0}
                                    max={100}
                                />{" "}
                                %
                                {Math.ceil(percentage)
                                    ? Math.ceil(percentage)
                                    : 0}
                            </label>
                            <h4>
                                Spending limit: max €
                                {incomeTotal?.toLocaleString()},00
                            </h4>
                        </form>
                        <button onClick={submitLimit}>Confirm limit</button>
                    </article>
                </div>
            </main>
            <Navbar provider={provider} />
        </>
    );
};

export default Home;
