import Navbar from "../../components/Navbar/Navbar";
import "./Home.scss";
import { useEffect, useState } from "react";
import { backendUrl } from "../../api";
import incomeIcon from "../../../public/incomeIcon.svg";
import expenseIcon from "../../../public/expenseIcon.svg";
import limitIcon from "../../../public/limitIcon.svg";
import Card from "../../components/Card/Card";
import Button from "../../components/Button/Button";

// #####################################################

const Home = ({ provider }) => {
    const [index, setIndex] = useState(0);
    const [expenseTotal, setExpenseTotal] = useState(0);
    const [incomeTotal, setIncomeTotal] = useState(0);
    const [limit, setLimit] = useState(0);
    const [percentage, setPercentage] = useState(0);
    const [message, setMessage] = useState(null);

    // #####################################################

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

    // #####################################################

    useEffect(() => {
        if (provider?.accounts?.length > index)
            provider.setAccount(provider.accounts[index]);
        else setIndex(0);
    }, [index]);

    // #####################################################

    useEffect(() => {
        if (incomeTotal < limit) {
            setPercentage(100);
        } else setPercentage((Number(limit) / Number(incomeTotal)) * 100);
    }, [limit]);

    // #####################################################

    useEffect(() => {
        setLimit(Number((incomeTotal * percentage) / 100).toFixed(0));
    }, [percentage]);

    // #####################################################

    const toggleModal = () => {
        const modal = document.getElementById("modal");
        modal.classList.toggle("show_modal");
    };

    // #####################################################

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

    // #####################################################

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
                <h5>Total wallet</h5>
                <section>
                    <div>
                        <article>
                            <div>
                                <img src={incomeIcon} alt="income icon" />
                                <p>Income</p>
                            </div>
                            <h2>
                                {incomeTotal?.toLocaleString("de-DE", {
                                    style: "currency",
                                    currency: "EUR",
                                })}
                            </h2>
                        </article>
                        <article>
                            <div>
                                <img src={expenseIcon} alt="expense icon" />
                                <p>Expense</p>
                            </div>
                            <h2>
                                {expenseTotal?.toLocaleString("de-DE", {
                                    style: "currency",
                                    currency: "EUR",
                                })}
                            </h2>
                        </article>
                    </div>
                    <article
                        className="limit_dislpay_wrapper"
                        onClick={toggleModal}
                    >
                        <div>
                            <img src={limitIcon} alt="limit icon" />
                        </div>
                        <div>
                            {provider.account?.limit ? (
                                <>
                                    <p>Monthly spending limit</p>
                                    <h2>
                                        {provider.account?.limit.toLocaleString(
                                            "de-DE",
                                            {
                                                style: "currency",
                                                currency: "EUR",
                                            }
                                        )}
                                    </h2>
                                </>
                            ) : (
                                <>
                                    <p>No monthly spending limit set.</p>
                                </>
                            )}
                        </div>
                        <div>
                            <span></span>
                            <span></span>
                            <span></span>
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
                                <input
                                    onChange={(e) => setLimit(e.target.value)}
                                    disabled={incomeTotal === 0}
                                    value={
                                        limit > incomeTotal
                                            ? incomeTotal
                                            : limit
                                    }
                                    type="number"
                                />
                                <p>€</p>
                            </label>
                            <p>
                                %{" "}
                                {Math.ceil(percentage)
                                    ? Math.ceil(percentage)
                                    : 0}
                            </p>
                            <label>
                                <input
                                    className={
                                        percentage > 60 && percentage <= 80
                                            ? "limit_range_middle"
                                            : percentage >= 80
                                            ? "limit_range_high"
                                            : "limit_range_low"
                                    }
                                    disabled={incomeTotal === 0}
                                    defaultValue={0}
                                    value={percentage ? percentage : 0}
                                    onChange={(e) =>
                                        setPercentage(e.target.value)
                                    }
                                    type="range"
                                    min={0}
                                    max={100}
                                />
                            </label>
                            <h6>Spending limit:</h6>
                            <h4>
                                {incomeTotal > 0
                                    ? `max ${incomeTotal?.toLocaleString(
                                          "de-DE",
                                          {
                                              style: "currency",
                                              currency: "EUR",
                                          }
                                      )}`
                                    : "Account has no income"}
                            </h4>
                        </form>
                        <div>
                            <Button
                                btnContent={"Confirm"}
                                btnFunction={submitLimit}
                            />
                        </div>
                    </article>
                </div>
                <Navbar provider={provider} />
            </main>
        </>
    );
};

export default Home;
