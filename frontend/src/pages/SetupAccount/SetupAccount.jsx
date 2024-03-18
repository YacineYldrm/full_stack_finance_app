import { useState } from "react";
import logo from "../../../public/logo.png";
import placeholderImage from "../../../public/PlaceHolderImage.svg";
import "./SetupAccount.scss";
import { useNavigate } from "react-router-dom";
import { backendUrl } from "../../api";
import ProfileImageUpload from "../../components/ProfileImageUpload/ProfileImageUpload";
import Button from "../../components/Button/Button";

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
        const response = await fetch(backendUrl + "users/edit", {
            method: "POST",
            headers: {
                authorization,
            },
            body: fd,
        });
        const { success, result, error, message } = await response.json();
        if (!success) {
            console.log(error, message);
            setMessage(message);
        } else provider.setActiveUser(result);
    };

    // #################################################

    const createAccount = async () => {
        const authorization = provider.authorization;
        const response = await fetch(backendUrl + "accounts/create", {
            method: "POST",
            headers: { "Content-Type": "application/json", authorization },
            body: JSON.stringify(accountInfo),
        });
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
        navigate("/home");
    };

    // #################################################

    return (
        <main className="account_setup">
            <div>
                <img src={logo} alt="finco logo" />
            </div>
            <div>
                <h2>Setup your account</h2>
                <p>Profile picture</p>
            </div>
            <div>
                <ProfileImageUpload />
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
                <h4>Valid until</h4>
                <input type="month" />
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
