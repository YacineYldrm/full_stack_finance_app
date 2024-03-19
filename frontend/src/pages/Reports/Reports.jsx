import "./Reports.scss";
import incomeIcon from "../../../public/incomeIcon.svg";
import expenseIcon from "../../../public/expenseIcon.svg";
import { useEffect, useState } from "react";
import Transaction from "../../components/Transaction/Transaction";
import ReactECharts from "echarts-for-react";
import Arrow from "../../../public/svg/Arrows/Arrow";
import { useNavigate } from "react-router-dom";
import { mediaUrl } from "../../api";

const Reports = ({ provider }) => {
    const [allTransactions, setAllTransactions] = useState([]);
    const [renderedTransactions, setRenderedTransactions] = useState([]);
    const [index, setIndex] = useState(5);

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

    // #######################render loadmore #############################

    useEffect(() => {
        setRenderedTransactions(allTransactions?.slice(0, index));
    }, [index, allTransactions]);

    // ###############################################################

    useEffect(() => {
        setAllTransactions(
            provider?.account?.transactions?.sort(
                (transOne, transTwo) => transTwo.date - transOne.date
            )
        );
    }, [provider.account]);

    // ###############################################################
    const dailyView = {
        legend: [{ show: true, itemGap: 30 }],
        tooltip: {},
        animationEasing: "circularIn",
        color: ["#da6e53"],
        textStyle: {
            fontFamily: "urbanist",
            fontSize: "14px",
        },
        grid: {
            left: 10,
            containLabel: true,
            bottom: 10,
            top: 50,
            right: 10,
        },
        dataset: {
            dimensions: ["period", "expense"],
            source: [],
        },
        xAxis: { type: "category" },
        yAxis: { axisLabel: false, splitNumber: 6 },
        // Declare several bar series, each will be mapped
        // to a column of dataset.source by default.
        series: [
            {
                type: "line",
                smooth: true,
                areaStyle: {
                    color: "#da6e53",
                    origin: "start",
                },
            },
            {
                type: "none",
            },
        ],
    };

    // ###############################################################

    const setMonthlyView = () => {
        const source = [...monthlyView.dataset.source];
        const transactions = provider?.account?.transactions;

        transactions?.forEach((transaction) => {
            const transactionDate = new Date(transaction.date).getMonth();
            source[transactionDate][transaction.type] =
                source[transactionDate][transaction.type] + transaction.amount;
        });
    };

    const setDailyView = () => {
        const transactions = provider?.account?.transactions;

        transactions?.forEach((transaction) => {
            const transactionYear = new Date(transaction.date).getFullYear();
            const transactionMonth = new Date(Date.now()).getMonth();
            const calcDay = new Date(Date.now()).getDate();
            // const monthLength = new Date(
            // 	transactionYear,
            // 	transactionMonth + 1,
            // 	0,
            // ).getDate();
            let sourceArray = [];

            for (let i = 1; i <= calcDay; i++) {
                sourceArray = [
                    ...sourceArray,
                    {
                        period: i,
                        expense: 0,
                    },
                ];
            }
            const expenseTransactions = transactions?.filter(
                (transaction) => transaction.type === "expense"
            );

            expenseTransactions?.forEach((transaction) => {
                const transactionDay = new Date(transaction.date).getDate();
                if (transactionDay <= calcDay) {
                    sourceArray[transactionDay - 1][transaction.type] =
                        sourceArray[transactionDay - 1][transaction.type] +
                        transaction.amount;
                }
            });
            dailyView.dataset.source = sourceArray;
        });
    };

    const monthlyView = {
        legend: [{ show: true, itemGap: 30 }],
        tooltip: {},
        animationEasing: "circularIn",
        color: ["#da6e53", "#409474"],
        textStyle: {
            fontFamily: "urbanist",
            fontSize: "14px",
        },
        grid: {
            left: 10,
            containLabel: true,
            bottom: 10,
            top: 50,
            right: 10,
        },
        dataset: {
            dimensions: ["period", "expense", "income"],
            source: [
                { period: "Jan", income: 0, expense: 0 },
                { period: "Feb", income: 0, expense: 0 },
                { period: "Mar", income: 0, expense: 0 },
                { period: "Apr", income: 0, expense: 0 },
                { period: "May", income: 0, expense: 0 },
                { period: "Jun", income: 0, expense: 0 },
                { period: "Jul", income: 0, expense: 0 },
                { period: "Aug", income: 0, expense: 0 },
                { period: "Sep", income: 0, expense: 0 },
                { period: "Oct", income: 0, expense: 0 },
                { period: "Nov", income: 0, expense: 0 },
                { period: "Dec", income: 0, expense: 0 },
            ],
        },
        xAxis: { type: "category" },
        yAxis: { axisLabel: false, splitNumber: 6 },
        // Declare several bar series, each will be mapped
        // to a column of dataset.source by default.
        series: [{ type: "bar" }, { type: "bar" }],
    };

    setMonthlyView();
    setDailyView();

    const [dailyOption, setDailyOption] = useState(monthlyView);
    // ###################### HEADER ON SCROLL EFFEKT  ##############################

    const hideOnScroll = () => {
        const header = document.getElementById("reports_header");
    };

    // ###############################################################

    return (
        <>
            <main className="report_main">
                <section>
                    <div id="reports_header" className="userInfo">
                        <Arrow onClick={() => navigate("/home")} />
                        <img
                            onClick={() => navigate("/menu")}
                            src={`${mediaUrl}${provider.activeUser?.profileImage}`}
                            alt=""
                        />
                    </div>
                    <h1>Reports</h1>
                    <div>
                        <article>
                            <div>
                                <img src={incomeIcon} alt="income icon" />
                            </div>
                            <div>
                                <p>Income</p>
                                <h2>
                                    {provider.incomeTotal?.toLocaleString(
                                        "de-DE",
                                        {
                                            style: "currency",
                                            currency: "EUR",
                                        }
                                    )}
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
                                    {provider.expenseTotal?.toLocaleString(
                                        "de-DE",
                                        {
                                            style: "currency",
                                            currency: "EUR",
                                        }
                                    )}
                                </h2>
                            </div>
                        </article>
                    </div>
                </section>
                <article className="bar_chart">
                    <ReactECharts option={dailyOption} />
                    <article
                        onClick={() => setDailyOption(monthlyView)}
                    ></article>
                    <article
                        onClick={() => setDailyOption(dailyView)}
                    ></article>
                </article>
                <section>
                    {renderedTransactions?.map((transaction) => (
                        <Transaction
                            _delete={false}
                            provider={provider}
                            key={transaction._id}
                            transaction={transaction}
                        />
                    ))}
                </section>
                <section>
                    {index < allTransactions?.length ? (
                        <p
                            onClick={() => {
                                index < allTransactions?.length
                                    ? setIndex(index + 5)
                                    : null;
                            }}
                        >
                            load more
                        </p>
                    ) : null}
                    {index <= 5 || allTransactions?.length <= 5 ? null : (
                        <p
                            onClick={() => {
                                index !== 5 ? setIndex(index - 5) : null;
                            }}
                        >
                            show less
                        </p>
                    )}
                </section>
            </main>
        </>
    );
};

export default Reports;
