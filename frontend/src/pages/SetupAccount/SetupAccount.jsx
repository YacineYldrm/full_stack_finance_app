// -------------------------Imports---------------------------

import "./SetupAccount.scss";

import {
    ProfileImageUpload,
    Button,
    backendUrl,
    useNavigate,
    useState,
    logo,
    calendar,
    getAllAccounts,
} from "../../utils/files";

// -------------------------Imports---------------------------

const SetupAccount = ({ provider }) => {
    // -------------------------States---------------------------

    const [image, setImage] = useState(null);
    const [accountInfo, setAccountInfo] = useState({
        cardNumber: "",
        type: "",
        currencyType: {},
    });
    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    // --------------------triggers on click-----------------------
    //    Sends profile Data to server to update user in the Database
    // ----------------------------------------------------------

    const profileEdit = async () => {
        const authorization = provider?.authorization;
        const [firstName, lastName] = provider?.activeUser?.user?.split(" ");

        const userInfo = JSON.stringify({
            ...provider?.activeUser,
            firstName,
            lastName,
        });
        const fd = new FormData();
        fd.append("userInfo", userInfo);
        image ? fd.append("image", image) : null;
        const profileEditFetch = await fetch(backendUrl + "users/edit", {
            method: "POST",
            headers: {
                authorization,
            },
            body: fd,
        });
        const { success, result, error, message } =
            await profileEditFetch.json();
        if (!success) {
            console.log(error, message);
            setMessage(message);
        } else provider.setActiveUser(result);
    };

    // --------------------triggers on click-----------------------
    //    Sends profile Data to server to create user in the Database
    // ----------------------------------------------------------

    const createAccount = async () => {
        const authorization = provider.authorization;
        const createAccountFetch = await fetch(backendUrl + "accounts/create", {
            method: "POST",
            headers: { "Content-Type": "application/json", authorization },
            body: JSON.stringify(accountInfo),
        });
        const { success, result, error, message } =
            await createAccountFetch.json();
        if (!success) {
            console.log(error, message);
            setMessage(error, message);
        } else getAllAccounts(provider);
    };

    // --------------------triggers on click-----------------------
    //    Sends the initial accountdata and profile to server to create first account in the Database
    // ----------------------------------------------------------

    const handleAccountSetup = async () => {
        event.preventDefault();
        await profileEdit();
        if (accountInfo.cardNumber !== "" && accountInfo.type !== "")
            await createAccount();
        navigate("/home");
    };

    // --------------------triggers on click---------------------
    //    gets the actual date to set as default dateinput value
    // ----------------------------------------------------------

    const minDate = new Date(
        Date.now() - new Date().getTimezoneOffset() * 60000
    )
        .toISOString()
        .slice(0, 7);

    // ---------------------------------------------------------------------

    return (
        <main className="account_setup">
            <div>
                <img src={logo} alt="finoccio logo" />
            </div>
            <div>
                <h2>Setup your account</h2>
                <p>Profile picture</p>
            </div>
            <div>
                <ProfileImageUpload
                    provider={provider}
                    image={image}
                    setImage={setImage}
                    editUser={profileEdit}
                />
            </div>
            <form>
                <h4>Add your bank account</h4>
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
                    <option value="Credit Card">Credit Card</option>
                    <option value="Savings account">Savings Account</option>
                    <option value="Business Account">Business Account</option>
                    <option value="Basic Account">Basic Account</option>
                    <option value="Family Account">Family Account</option>
                </select>
                <label>
                    <select
                        defaultValue={"Choose your currency"}
                        onChange={(e) => {
                            const [country, style, currency] =
                                e.target.value.split(" ");
                            setAccountInfo({
                                ...accountInfo,
                                currencyType: { country, style, currency },
                            });
                        }}
                    >
                        <option value="Choose your currency" disabled>
                            {" "}
                            Choose your currency
                        </option>
                        <option value="de-DE currency EUR">EURO</option>
                        <option value="en-US currency USD">US-DOLLAR</option>
                    </select>
                </label>
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

                <h4>{message}</h4>
                <Button
                    btnContent={"Create"}
                    btnFunction={handleAccountSetup}
                />
            </form>
        </main>
    );
};

export default SetupAccount;
