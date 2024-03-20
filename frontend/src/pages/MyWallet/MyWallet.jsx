// -------------------------Imports---------------------------

import "./MyWallet.scss";

import {
    editPen,
    changeUser,
    deleteIcon,
    arrowright,
    Arrow,
    Button,
    getAllAccounts,
    backendUrl,
    useNavigate,
    useEffect,
    useState,
    calendar,
    bankCard,
    CardCourouselle,
    updateArray,
    calcTotal,
    calcMonth,
} from "../../utils/files";

// -------------------------Imports---------------------------

const MyWallet = ({ provider }) => {
    // -------------------------States---------------------------

    const navigate = useNavigate();
    const [message, setMessage] = useState(null);
    const [accountInfo, setAccountInfo] = useState({});
    const [newAccountInfo, setNewAccountInfo] = useState({});
    const [newMember, setNewMember] = useState(null);
    const [password, setPassword] = useState(null);
    const [successMessage, setSuccessMessage] = useState(true);

    // --------------------triggers on Load-----------------------
    //                Sets the Active Account info
    // -----------------------------------------------------------

    useEffect(() => {
        setAccountInfo(provider.account);
    }, [provider.account]);

    // --------------------triggers on Click-----------------------
    //        Sends Data to server for Creating User in Database
    // -----------------------------------------------------------

    const createAccount = async () => {
        event.preventDefault();
        const authorization = provider?.authorization;
        const createAccountFetch = await fetch(backendUrl + "accounts/create", {
            method: "POST",
            headers: { "Content-Type": "application/json", authorization },
            body: JSON.stringify({
                cardNumber: newAccountInfo.cardNumber,
                type: newAccountInfo.type,
                expirationDate: newAccountInfo.expirationDate,
            }),
        });
        const { success, result, error, message } =
            await createAccountFetch.json();
        if (!success) {
            console.log(error, message);
            setSuccessMessage(false);
            setMessage(message);
        } else {
            await getAllAccounts(provider);
            provider.setCardIndex(provider.accounts.length);
            setSuccessMessage(true);
            setMessage("Card successfully added to your wallet!");
        }
    };

    // --------------------triggers on Click-------------------------
    // Sends Data to server for finding and updating User in Database
    // --------------------------------------------------------------

    const editAccount = async () => {
        event.preventDefault();
        const authorization = provider?.authorization;
        const editAccountFetch = await fetch(backendUrl + "accounts/edit", {
            method: "POST",
            headers: { "Content-Type": "application/json", authorization },
            body: JSON.stringify(accountInfo),
        });
        const { success, result, error, message } =
            await editAccountFetch.json();
        if (!success) {
            console.log(error, message);
            setMessage(message);
        } else {
            console.log(result);
            await getAllAccounts(provider);
            provider.setAccount(result);

            toggleDisplayOption("options2");
            scrollTo({
                top: 0,
                behavior: "smooth",
            });
        }
    };

    // --------------------triggers on Click-------------------------
    // Sends Data to server for finding and adding User as Accont member in  the Database
    // --------------------------------------------------------------

    const addMember = async () => {
        event.preventDefault();
        const authorization = provider?.authorization;
        const response = await fetch(backendUrl + "accounts/edit", {
            method: "POST",
            headers: { "Content-Type": "application/json", authorization },
            body: JSON.stringify({
                _id: provider.account?._id,
                newMember,
            }),
        });
        const { success, result, error, message } = await response.json();
        if (!success) {
            console.log(error, message);
            setMessage(message);
        } else {
            await getAllAccounts(provider);
            toggleDisplayOption("options3");
        }
    };

    // --------------------triggers on Click-------------------------
    // Sends Data to server for finding and deleting account from the Database
    // --------------------------------------------------------------

    const deleteAccount = async () => {
        event.preventDefault();
        const authorization = provider?.authorization;
        const deleteAccountFetch = await fetch(backendUrl + "accounts/delete", {
            method: "DELETE",
            headers: { "Content-Type": "application/json", authorization },
            body: JSON.stringify({
                password,
                accountId: provider.account._id,
            }),
        });
        const { success, result, error, message } =
            await deleteAccountFetch.json();
        if (!success) {
            console.log(error, message);
            setMessage(message);
        } else {
            await getAllAccounts(provider);
            navigate("/home");
        }
    };

    // --------------------triggers on Click-------------------------
    //                  Toggles the show accordion class
    // --------------------------------------------------------------

    const toggleDisplayOption = (idName) => {
        const option = document.getElementById(idName);
        const optionSibling = document?.getElementById(idName)?.nextSibling;
        option?.classList.toggle("rotate_arrow");
        optionSibling?.classList.toggle("display_option_inputs");
    };

    // --------------------Initiates on Load-------------------------
    //         Sets the mindate of Date Input to Actual Date
    // --------------------------------------------------------------

    const minDate = new Date(
        Date.now() - new Date().getTimezoneOffset() * 60000
    )
        .toISOString()
        .slice(0, 7);

    // ----------------------------------------------------------

    return (
        <>
            <main className="my_wallet_main">
                <div>
                    <Arrow onClick={() => navigate("/menu")} />
                </div>
                <h3>My Wallet</h3>
                <CardCourouselle provider={provider} />
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
                                        setNewAccountInfo({
                                            ...newAccountInfo,
                                            cardNumber: e.target.value,
                                        });
                                    }}
                                    type="text"
                                    placeholder="Card Number"
                                />
                                <select
                                    onChange={(e) => {
                                        setNewAccountInfo({
                                            ...newAccountInfo,
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
                                <h4>Expiry date</h4>
                                <label>
                                    <input
                                        onChange={(e) => {
                                            setNewAccountInfo({
                                                ...newAccountInfo,
                                                expirationDate: e.target.value,
                                            });
                                        }}
                                        type="month"
                                        min={minDate}
                                        placeholder="Card Number"
                                    />
                                    <img src={calendar} alt="" />
                                </label>
                                {message ? (
                                    <p
                                        style={{
                                            color: successMessage
                                                ? "#0B7856"
                                                : "#CC4C30",
                                            fontWeight: "600",
                                            width: "40vmax",
                                            marginInline: "auto",
                                            textAlign: "center",
                                            fontSize: "2vmax",
                                        }}
                                    >
                                        {message}
                                    </p>
                                ) : null}
                                <div>
                                    <Button
                                        btnContent={"Add bank account"}
                                        btnFunction={createAccount}
                                    />
                                </div>
                            </form>
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
                                <label htmlFor="card_num">Card number </label>
                                <input
                                    name="card_num"
                                    onChange={(e) => {
                                        setAccountInfo({
                                            ...accountInfo,
                                            cardNumber: e.target.value,
                                        });
                                    }}
                                    type="text"
                                    defaultValue={accountInfo?.cardNumber}
                                />

                                <label htmlFor="type">Account type </label>
                                <select
                                    onChange={(e) => {
                                        setAccountInfo({
                                            ...accountInfo,
                                            type: e.target.value,
                                        });
                                    }}
                                    name="type"
                                    defaultValue="default"
                                >
                                    <option disabled value="default">
                                        {accountInfo?.type}
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
                                <h4>Expiry date</h4>
                                <label>
                                    <input
                                        onChange={(e) => {
                                            setAccountInfo({
                                                ...accountInfo,
                                                expirationDate: e.target.value,
                                            });
                                        }}
                                        type="month"
                                        min={minDate}
                                        placeholder="Card Number"
                                    />
                                    <img src={calendar} alt="" />
                                </label>
                                <div>
                                    <Button
                                        btnContent={"Confirm"}
                                        btnFunction={editAccount}
                                    />
                                </div>
                            </form>
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
                                <div>
                                    <Button
                                        btnContent={"Confirm"}
                                        btnFunction={addMember}
                                    />
                                </div>
                            </form>
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
                                    Enter your Password and confirm to delete
                                    your selected Account.
                                </label>
                                <input
                                    onChange={(e) =>
                                        setPassword(e.target.value)
                                    }
                                    type="password"
                                    placeholder="Password"
                                />
                                <div>
                                    <Button
                                        btnContent={"Confirm"}
                                        btnFunction={deleteAccount}
                                    />
                                </div>
                            </form>
                        </div>
                    </article>
                </section>
            </main>
        </>
    );
};

export default MyWallet;
