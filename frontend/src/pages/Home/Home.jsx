// -------------------------Imports---------------------------

import "./Home.scss";
import {
    mediaUrl,
    useNavigate,
    useEffect,
    useState,
    Navbar,
    calcTotal,
    Button,
    CardCourouselle,
    backendUrl,
    incomeIcon,
    expenseIcon,
    limitIcon,
    calcMonth,
    calcExpectedExpenses,
    expectedGreen,
    expectedYellow,
    expectedRed,
} from "../../utils/files";

// -------------------------Imports---------------------------

const Home = ({ provider }) => {
    // -------------------------States---------------------------

    const [limit, setLimit] = useState(0);
    const [percentage, setPercentage] = useState(0);
    const [message, setMessage] = useState(null);
    const navigate = useNavigate();
    const [account, setAccount] = useState(null);
    const [expectedExpenses, setExpectedExpenses] = useState(null);

    // -------------------------States---------------------------

    // --------------------triggers on Load-----------------------
    //                Sets the Active Account info
    // -----------------------------------------------------------

    useEffect(() => {
        setAccount(provider.account);
    }, [provider.account]);

    // --------------------triggers on account change--------------------
    //    calculates totalExpenses and Incomes ad groups by Day
    // -----------------------------------------------------------------

    useEffect(() => {
        if (provider?.account) calcTotal(provider?.account, provider);
        if (provider?.account) calcMonth(provider?.account, provider);
    }, [provider?.account]);

    // --------------------triggers on monthlyExpense change-------------
    //                     calculates expectedExpenses
    // -----------------------------------------------------------------

    useEffect(() => {
        if (provider.monthlyExpense !== 0)
            setExpectedExpenses(calcExpectedExpenses(provider.monthlyExpense));
        else setExpectedExpenses(null);
    }, [provider.monthlyExpense]);

    // --------------------triggers on limit(input) change-------------
    //                     calculates and sets Percentage
    // -----------------------------------------------------------------

    useEffect(() => {
        const percentage = Math.floor((limit / provider.incomeTotal) * 100);
        if (percentage <= 100) setPercentage(percentage);
        else setPercentage(100);
    }, [limit]);

    // --------------------triggers on Click-------------
    //                  Toggles Modal Display
    // --------------------------------------------------

    const toggleModal = () => {
        const modal = document.getElementById("modal");
        modal.classList.toggle("show_modal");
    };

    // --------------------triggers on Click-------------
    //  sends the new Limit to the Server to write in to the Database
    // --------------------------------------------------

    const submitLimit = async () => {
        const submitLimitFetch = await fetch(`${backendUrl}accounts/edit`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                authorization: provider.authorization,
            },
            body: JSON.stringify({ ...provider.account, limit }),
        });
        const { success, result, error, message } =
            await submitLimitFetch.json();
        if (!success) {
            console.log(error);
            setMessage(message);
        } else {
            setAccount(result);
            toggleModal();
        }
    };

    // -------------triggers on limit and expenses change -------------
    //              sets the icon in estimated expences
    // ----------------------------------------------------------------

    const expectedStatusColor = [expectedGreen, expectedYellow, expectedRed];

    const expectedFeedback = () => {
        if (
            expectedExpenses < provider?.account?.limit &&
            expectedExpenses >
                provider.account?.limit - provider?.account?.limit / 10
        ) {
            return expectedStatusColor[1];
        } else if (expectedExpenses < provider?.account?.limit) {
            return expectedStatusColor[0];
        } else {
            return expectedStatusColor[2];
        }
    };

    // ----------------------------------------------------------------

    return (
        <>
            <main className="home_main_wrapper">
                <div>
                    <div>
                        <p>Welcome back.</p>
                        <h3>{provider?.activeUser?.user}</h3>
                    </div>
                    <div className="profile_img_wrapper">
                        <img
                            onClick={() => navigate("/menu")}
                            src={`${mediaUrl}${provider?.activeUser?.profileImage}`}
                            alt="profile picture."
                        />
                    </div>
                </div>
                <CardCourouselle provider={provider} />
                <div>
                    <h5>Account Balance</h5>
                    <h2
                        style={{
                            color:
                                provider?.incomeTotal - provider?.expenseTotal <
                                0
                                    ? "#da6e53"
                                    : "#409474",
                        }}
                    >
                        {(
                            provider?.incomeTotal - provider?.expenseTotal
                        ).toLocaleString("de-DE", {
                            style: "currency",
                            currency: "EUR",
                        })}
                    </h2>
                </div>
                <section>
                    <div>
                        <article>
                            <div>
                                <img src={incomeIcon} alt="income icon" />
                                <p>Income</p>
                            </div>
                            <h2>
                                {provider?.monthlyIncome?.toLocaleString(
                                    "de-DE",
                                    {
                                        style: "currency",
                                        currency: "EUR",
                                    }
                                )}
                            </h2>
                        </article>
                        <article>
                            <div>
                                <img src={expenseIcon} alt="expense icon" />
                                <p>Expense</p>
                            </div>
                            <h2>
                                {provider?.monthlyExpense?.toLocaleString(
                                    "de-DE",
                                    {
                                        style: "currency",
                                        currency: "EUR",
                                    }
                                )}
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
                            {account?.limit ? (
                                <>
                                    <p>Monthly spending limit</p>
                                    <h2>
                                        {account.limit.toLocaleString("de-DE", {
                                            style: "currency",
                                            currency: "EUR",
                                        })}
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
                    {expectedExpenses && (
                        <article className="limit_dislpay_wrapper">
                            <>
                                <div>
                                    <img
                                        src={expectedFeedback()}
                                        alt="limit icon"
                                    />
                                </div>
                                <div>
                                    <p>Estimated expenses</p>
                                    <h2>
                                        {expectedExpenses?.toLocaleString(
                                            "de-DE",
                                            {
                                                style: "currency",
                                                currency: "EUR",
                                            }
                                        )}
                                    </h2>
                                </div>
                            </>
                        </article>
                    )}
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
                                    disabled={provider.incomeTotal === 0}
                                    value={
                                        limit > provider.incomeTotal
                                            ? provider.incomeTotal
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
                                    disabled={provider.incomeTotal === 0}
                                    value={percentage ? percentage : 0}
                                    onChange={(e) =>
                                        setLimit(
                                            Number(
                                                (provider.incomeTotal *
                                                    e.target.value) /
                                                    100
                                            ).toFixed(0)
                                        )
                                    }
                                    type="range"
                                    min={0}
                                    max={100}
                                    step={1}
                                />
                            </label>
                            <h6>Spending limit:</h6>
                            <h4>
                                {provider.incomeTotal > 0
                                    ? `max ${provider.incomeTotal?.toLocaleString(
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
                <Navbar providerNav={provider} />
            </main>
        </>
    );
};

export default Home;
