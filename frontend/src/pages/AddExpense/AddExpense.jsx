import "./AddExpense.scss";
import { useEffect, useState } from "react";
import { backendUrl, mediaUrl } from "../../api";
import { useNavigate } from "react-router-dom";
import getAllAccounts from "../../utils/getAllAccounts";
// ####################################################
import Button from "../../components/Button/Button";
import Arrow from "../../../public/svg/Arrows/Arrow";
import Card from "../../components/Card/Card";
import Navbar from "../../components/Navbar/Navbar";
import calcTotal from "../../utils/calcTotal";
import calcMonth from "../../utils/calcMonth";

const AddExpense = ({ provider }) => {
    const [transactionInfo, setTransactionInfo] = useState({});
    const [file, setFile] = useState();
    const navigate = useNavigate();
    const [date, setDate] = useState(
        new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
            .toISOString()
            .slice(0, 10)
    );
    const [time, setTime] = useState(
        new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
            .toISOString()
            .slice(11, 16)
    );
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

    const updateArray = () => {
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
    };

    // #################################################

    // useEffect(() => {
    //     if (provider.authorization) getAllAccounts(provider);
    // }, [provider.authorization]);

    // #################################################

    const getDateTime = () => {
        return new Date(`${date}T${time}:00`).getTime();
    };

    // #################################################

    const addTransaction = async () => {
        event.preventDefault();

        const fd = new FormData();
        const transaction = {
            ...transactionInfo,
            date: getDateTime(),
            type: "expense",
            accountId: provider.account._id,
        };

        fd.append("transactionInfo", JSON.stringify(transaction));
        file ? fd.append("image", file) : null;
        const res = await fetch(`${backendUrl}accounts/add-transaction`, {
            method: "POST",
            body: fd,
            headers: { authorization: provider.authorization },
        });

        const { success, result, error, message } = await res.json();
        if (!success) {
            console.log(error);
            console.log(message);
        } else {
            calcTotal(result, provider);
            getAllAccounts(provider);
            provider?.setAccount(result);
            // updateArray();
            navigate("/home");
        }
    };

    // #################################################

    return (
        <>
            <main className="addExpense">
                <div className="userInfo">
                    <Arrow onClick={() => navigate("/home")} />
                    <img
                        onClick={() => navigate("/menu")}
                        src={`${mediaUrl}${provider.activeUser.profileImage}`}
                        alt=""
                    />
                </div>
                <h1>Add Expense</h1>
                <Card
                    provider={provider}
                    cardId={provider?.account._id}
                    account={provider?.account}
                />

                <form>
                    <input
                        type="number"
                        placeholder="Amount"
                        onChange={(e) =>
                            setTransactionInfo({
                                ...transactionInfo,
                                amount: e.target.value,
                            })
                        }
                    />
                    <label htmlFor="category">
                        <h4>Category</h4>
                    </label>
                    <select
                        name="category"
                        defaultValue={"Select Category..."}
                        required
                        id="category"
                        onChange={(e) =>
                            setTransactionInfo({
                                ...transactionInfo,
                                category: e.target.value,
                            })
                        }
                    >
                        <option value={"Select Category..."} disabled>
                            Select Category...
                        </option>
                        <option value="Food & Drink">Food & Drink</option>
                        <option value="Shopping">Shopping</option>
                        <option value="Insurance bill">Insurance bill</option>
                        <option value="Other Expense">Other Expense</option>
                        <option value="Rent">Rent</option>
                    </select>
                    <div>
                        <label htmlFor="date">
                            <h4>Date</h4>
                            <input
                                type="date"
                                name="date"
                                id="date"
                                defaultValue={date}
                                onChange={(e) => setDate(e.target.value)}
                            />
                        </label>
                        <label htmlFor="time">
                            <h4>Time</h4>
                            <input
                                type="time"
                                name="time"
                                id="time"
                                defaultValue={time}
                                onChange={(e) => setTime(e.target.value)}
                            />
                        </label>
                    </div>
                    <textarea
                        name="comment"
                        id="commen"
                        placeholder="Comment..."
                        cols="30"
                        rows="1"
                        onChange={(e) =>
                            setTransactionInfo({
                                ...transactionInfo,
                                comment: e.target.value,
                            })
                        }
                    ></textarea>
                    <div>
                        <Button
                            btnContent={"Add expenses"}
                            btnFunction={addTransaction}
                        />
                        <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => setFile(e.target.files[0])}
                        />
                    </div>
                </form>
            </main>
        </>
    );
};

export default AddExpense;
