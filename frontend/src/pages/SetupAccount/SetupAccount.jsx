import { useState } from "react";
import logo from "../../../public/logo.png";
import placeholderImage from "../../../public/PlaceHolderImage.svg";
import "./SetupAccount.scss";
import { useNavigate } from "react-router-dom";

const SetupAccount = ({ provider }) => {
    const [imgFile, setImgFile] = useState(null);
    const [cardNumber, setCardNumber] = useState(null);
    const [accountInfo, setAccountInfo] = useState({
        cardNumber: "",
        type: "",
    });
    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    // #################################################

    const profileEdit = async () => {
        const authorization = provider.authorization;
        const userInfo = JSON.stringify(provider.activeUser);
        const fd = new FormData();
        fd.append("userInfo", userInfo);
        imgFile ? fd.append("image", imgFile) : null;
        const response = await fetch(
            "http://localhost:3001/api/v1/" + "users/edit",
            {
                method: "POST",
                headers: {
                    authorization,
                },
                body: fd,
            }
        );
        const { success, result, error, message } = await response.json();
        if (!success) {
            console.log(error, message);
            setMessage(message);
        } else provider.setActiveUser(result);
    };

    // #################################################

    const createAccount = async () => {
        const authorization = provider.authorization;
        const response = await fetch(
            "http://localhost:3001/api/v1/" + "accounts/create",
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
        } else console.log(result);
    };

    // #################################################

    const handleAccountSetup = async () => {
        event.preventDefault();
        await profileEdit();
        await createAccount();
        navigate("/");
    };

    // #################################################

    return (
        <main className="account_setup">
            <div>
                <img src={logo} alt="finco logo" />
            </div>
            <h1>Setup your account</h1>
            <div>
                <p>Profile picture</p>
                <div>
                    <img
                        src={
                            imgFile
                                ? URL.createObjectURL(imgFile)
                                : placeholderImage
                        }
                        alt="profile picture"
                    />
                </div>
                <div>
                    <input
                        accept="image/*"
                        onChange={(e) => setImgFile(e.target.files[0])}
                        type="file"
                    />
                    <img src="" alt="" />
                </div>
            </div>
            <form>
                <input
                    onChange={(e) =>
                        setAccountInfo({
                            ...accountInfo,
                            cardNumber: e.target.value,
                        })
                    }
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
                    id=""
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
            </form>
            <h4>{message}</h4>
            <button onClick={() => handleAccountSetup()}>
                Profile Complete
            </button>
        </main>
    );
};

export default SetupAccount;
