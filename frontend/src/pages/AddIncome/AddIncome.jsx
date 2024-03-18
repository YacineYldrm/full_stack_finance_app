import { useState, useEffect } from "react";
import "./AddIncome.scss";
import { backendUrl, mediaUrl } from "../../api";
import Button from "../../components/Button/Button";
import Arrow from "../../../public/svg/Arrows/Arrow";
import Card from "../../components/Card/Card";
import { useNavigate } from "react-router-dom";
import getAllAccounts from "../../utils/getAllAccounts";
import calcTotal from "../../utils/calcTotal";
import CardCourouselle from "../../components/CardCarouselle/CardCarouselle";

const AddIncome = ({ provider }) => {
    const [transactionInfo, setTransactionInfo] = useState({});
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
    const [file, setFile] = useState();
    const navigate = useNavigate();

    // #################################################

    const getDateTime = () => {
        return new Date(`${date}T${time}:00`).getTime();
    };

    // #################################################

    // useEffect(() => {
    // 	if (provider.authorization) getAllAccounts(provider);
    // }, [provider.authorization]);

    // #################################################

    const addTransaction = async () => {
        event.preventDefault();
        const fd = new FormData();
        const transaction = {
            ...transactionInfo,
            date: getDateTime(),
            type: "income",
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
            getAllAccounts(provider);
            calcTotal(result, provider);
            provider.setAccount(result);
            console.log(result);

            navigate("/home");
        }
    };

    // #################################################

    return (
        <>
            <main className="addIncome">
                <div className="userInfo">
                    <Arrow onClick={() => navigate("/home")} />
                    <img
                        onClick={() => navigate("/menu")}
                        src={`${mediaUrl}${provider.activeUser?.profileImage}`}
                        alt=""
                    />
                </div>

                <h1>Add income</h1>
                <CardCourouselle provider={provider} />
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
                        <option disabled>Select Category...</option>
                        <option value="Salary">Salary</option>
                        <option value="Other Income">Other Income</option>
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
                            btnContent={"Add income"}
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

export default AddIncome;
