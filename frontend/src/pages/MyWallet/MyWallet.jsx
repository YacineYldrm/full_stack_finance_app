import bankCard from "../../../public/bank_card.svg";
import editPen from "../../../public/edit_pen.svg";
import changeUser from "../../../public/changeUser.svg";
import deleteIcon from "../../../public/delete.svg";
import arrowright from "../../../public/ArrowRight.svg";
import "./MyWallet.scss";
import Arrow from "../../../public/svg/Arrows/Arrow";
import { useNavigate } from "react-router-dom";
import Card from "../../components/Card/Card";
import { useEffect, useState } from "react";
import getAllAccounts from "../../utils/getAllAccounts";

const MyWallet = ({ provider }) => {
    const navigate = useNavigate();
    const [message, setMessage] = useState(null);
    const [accountInfo, setAccountInfo] = useState({});
    const [newMember, setNewMember] = useState(null);
    const [password, setPassword] = useState(null);

    useEffect(() => {
        provider.setAccount(provider?.accounts[provider?.cardIndex]);
    }, [provider]);

    useEffect(() => {
        setAccountInfo({ ...provider.account });
    }, [provider.account]);

    const createAccount = async () => {
        const authorization = provider?.authorization;
        const response = await fetch(
            "http://localhost:3001/api/v1/" + "accounts/create",
            {
                method: "POST",
                headers: { "Content-Type": "application/json", authorization },
                body: JSON.stringify({
                    cardNumber: accountInfo.cardNumber,
                    type: accountInfo.type,
                }),
            }
        );
        const { success, result, error, message } = await response.json();
        if (!success) {
            console.log(error, message);
            setMessage(message);
        } else {
            await getAllAccounts(provider);
            provider.setCardIndex(provider.accounts.length);
            navigate("/");
        }
    };

    const editAccount = async () => {
        const authorization = provider?.authorization;
        const response = await fetch(
            "http://localhost:3001/api/v1/" + "accounts/edit",
            {
                method: "POST",
                headers: { "Content-Type": "application/json", authorization },
                body: JSON.stringify(accountInfo),
            }
        );
        const { success, result, error, message } = await response.json();
        if (!success) {
            console.log(error, message);
            setMessage(message);
        } else {
            await getAllAccounts(provider);
            navigate("/");
        }
    };

    const addMember = async () => {
        const authorization = provider?.authorization;
        const response = await fetch(
            "http://localhost:3001/api/v1/" + "accounts/edit",
            {
                method: "POST",
                headers: { "Content-Type": "application/json", authorization },
                body: JSON.stringify({
                    _id: provider.account?._id,
                    newMember,
                }),
            }
        );
        const { success, result, error, message } = await response.json();
        if (!success) {
            console.log(error, message);
            setMessage(message);
        } else {
            await getAllAccounts(provider);
            navigate("/");
        }
    };

    const deleteAccount = async () => {
        const authorization = provider?.authorization;
        const response = await fetch(
            "http://localhost:3001/api/v1/" + "accounts/delete",
            {
                method: "DELETE",
                headers: { "Content-Type": "application/json", authorization },
                body: JSON.stringify({
                    password,
                    accountId: provider.account._id,
                }),
            }
        );
        const { success, result, error, message } = await response.json();
        if (!success) {
            console.log(error, message);
            setMessage(message);
        } else {
            await getAllAccounts(provider);
            navigate("/");
        }
    };

    const toggleDisplayOption = (idName) => {
        const option = document.getElementById(idName);
        const optionSibling = document.getElementById(idName).nextSibling;

        option.classList.toggle("rotate_arrow");

        optionSibling.classList.toggle("display_option_inputs");
    };

    return (
        <>
            <main className="my_wallet_main">
                <div>
                    <Arrow onClick={() => navigate("/menu")} />
                </div>
                <h3>My Wallet</h3>
                <Card account={provider.account} />
                <section>
                    <article className="my_wallet_options">
                        <div
                            id="option1"
                            className="option"
                            onClick={() => toggleDisplayOption("option1")}
                        >
                            <div>
                                <img src={bankCard} alt="" />
                                <p>Add new bank account</p>
                            </div>
                            <img
                                className="arrow_img"
                                src={arrowright}
                                alt=""
                            />
                        </div>
                        <div className="option_inputs_container">
                            <form>
                                <input
                                    onChange={(e) => {
                                        setAccountInfo({
                                            ...accountInfo,
                                            cardNumber: e.target.value,
                                        });
                                    }}
                                    type="text"
                                    placeholder="Card Number"
                                />
                                <select
                                    onChange={(e) => {
                                        setAccountInfo({
                                            ...accountInfo,
                                            type: e.target.value,
                                        });
                                    }}
                                    defaultValue="default"
                                    name=""
                                >
                                    <option disabled value="default">
                                        Select account type
                                    </option>
                                    <option value="Credit Card">
                                        Credit Card
                                    </option>
                                    <option value="Savings account">
                                        Savings Account
                                    </option>
                                    <option value="Business Account">
                                        Business Account
                                    </option>
                                    <option value="Basic Account">
                                        Basic Account
                                    </option>
                                    <option value="Family Account">
                                        Family Account
                                    </option>
                                </select>
                            </form>
                            <button onClick={() => createAccount()}>
                                Add bank account
                            </button>
                        </div>

                        <div
                            id="options2"
                            className="option"
                            onClick={() => toggleDisplayOption("options2")}
                        >
                            <div>
                                <img src={editPen} alt="" />
                                <p>Edit bank account</p>
                            </div>
                            <img src={arrowright} alt="" />
                        </div>
                        <div className="option_inputs_container">
                            <form>
                                <input
                                    onChange={(e) => {
                                        setAccountInfo({
                                            ...accountInfo,
                                            cardNumber: e.target.value,
                                        });
                                    }}
                                    type="text"
                                    defaultValue={provider.account?.cardNumber}
                                />

                                <label>
                                    Account type:{" "}
                                    <select
                                        onChange={(e) => {
                                            setAccountInfo({
                                                ...accountInfo,
                                                type: e.target.value,
                                            });
                                        }}
                                        defaultValue="default"
                                        name=""
                                    >
                                        <option disabled value="default">
                                            {provider.account?.type}
                                        </option>
                                        <option value="Credit Card">
                                            Credit Card
                                        </option>
                                        <option value="Savings account">
                                            Savings Account
                                        </option>
                                        <option value="Business Account">
                                            Business Account
                                        </option>
                                        <option value="Business Account">
                                            Basic Account
                                        </option>
                                        <option value="Business Account">
                                            Family Account
                                        </option>
                                    </select>
                                </label>
                            </form>
                            <button onClick={() => editAccount()}>
                                Confirm
                            </button>
                        </div>

                        <div
                            id="options3"
                            className="option"
                            onClick={() => toggleDisplayOption("options3")}
                        >
                            <div>
                                <img src={changeUser} alt="" />
                                <p>Add member to bank account</p>
                            </div>
                            <img src={arrowright} alt="" />
                        </div>
                        <div className="option_inputs_container">
                            <form>
                                <input
                                    onChange={(e) =>
                                        setNewMember(e.target.value)
                                    }
                                    type="text"
                                    placeholder="e.g. member@email.com"
                                />
                            </form>
                            <button onClick={() => addMember()}>Confirm</button>
                        </div>
                    </article>

                    <article>
                        <div
                            id="options4"
                            className="option"
                            onClick={() => toggleDisplayOption("options4")}
                        >
                            <div>
                                <img src={deleteIcon} alt="" />
                                <p>Delete bank account</p>
                            </div>
                            <img src={arrowright} alt="" />
                        </div>
                        <div className="option_inputs_container">
                            <form>
                                <label>
                                    {" "}
                                    Enter your Password and confirm to delete
                                    your selected Account.
                                    <input
                                        onChange={(e) =>
                                            setPassword(e.target.value)
                                        }
                                        type="password"
                                        placeholder="Password"
                                    />
                                </label>
                            </form>
                            <button onClick={() => deleteAccount()}>
                                Confirm
                            </button>
                        </div>
                    </article>
                </section>
            </main>
        </>
    );
};

export default MyWallet;
