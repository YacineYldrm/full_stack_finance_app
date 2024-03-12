import Navbar from "../../components/Navbar/Navbar";
import "./Home.scss";
import checkIcon from "../../../public/check.svg";
import checkIconBG from "../../../public/Bg.svg";
import { useEffect, useState } from "react";
import { backendUrl } from "../../api";
import CardLogo from "../../../public/svg/CardIcons/CardLogo/CardLogo";
import CardChip from "../../../public/svg/CardIcons/CardChip/CardChip";
import incomeIconBg from "../../../public/incomeIconBg.svg";
import trendingUp from "../../../public/trendingUp.svg";
import expenseIconBg from "../../../public/expenseIconBg.svg";
import trendingDown from "../../../public/trendingDown.svg";

const Home = ({ provider }) => {
    const [index, setIndex] = useState(0);
    const [expenseTotal, setExpenseTotal] = useState(0);
    const [incomeTotal, setIncomeTotal] = useState(0);

    const getAllAccounts = async () => {
        const response = await fetch(`${backendUrl}accounts`, {
            method: "GET",
            headers: { authorization: provider.authorization },
        });
        const { success, result, error, message } = await response.json();
        if (!success) {
            console.log(error, message);
        } else {
            console.log(result);
            provider.setAccounts(result);
            provider.setAccount(result[0]);
        }
    };
    useEffect(() => {
        getAllAccounts();
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

    return (
        <>
            <main className="home">
                <div>
                    <div>
                        <p>Welcome back.</p>
                        <h3>{provider.activeUser?.user}</h3>
                    </div>
                    <div>
                        <img
                            src={`http://localhost:3001/${provider?.activeUser?.profileImage}`}
                            alt="profile picture."
                        />
                    </div>
                </div>
                <article>
                    <div>
                        <img src={checkIconBG} alt="check icon background" />
                        <img src={checkIcon} alt="check icon" />
                    </div>
                    <CardLogo />
                    <p>{provider.account.type}</p>
                    <p>{provider.account.cardNumber}</p>
                    <div>
                        <CardChip />

                        <p>XX/XX</p>
                    </div>
                    <button onClick={() => setIndex(index + 1)}>
                        Next Account
                    </button>
                </article>
                <h4>Total wallet</h4>
                <section>
                    <div>
                        <article>
                            <div>
                                <img src={incomeIconBg} alt="income icon" />
                                <img src={trendingUp} alt="income icon" />
                            </div>
                            <p>Income</p>
                            <h2>+${incomeTotal}</h2>
                        </article>
                        <article>
                            <div>
                                <img src={expenseIconBg} alt="expense icon" />
                                <img src={trendingDown} alt="expense icon" />
                            </div>
                            <p>Expense</p>
                            <h2>-${expenseTotal}</h2>
                        </article>
                    </div>
                </section>
                <article></article>
            </main>
        </>
    );
};

export default Home;
