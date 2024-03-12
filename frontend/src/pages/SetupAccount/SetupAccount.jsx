import { useState } from "react";
import logo from "../../../public/logo.png";
import placeholderImage from "../../../public/PlaceHolderImage.svg";
import "./SetupAccount.scss";
import { useNavigate } from "react-router-dom";

const SetupAccount = ({ provider }) => {
    const [imgFile, setImgFile] = useState(null);
    const [cardNumber, setCardNumber] = useState(null);
    const [message, setMessage] = useState("");

    console.log(provider.activeUser);

    const navigate = useNavigate();

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

    const createAccount = async () => {
        const authorization = provider.authorization;
        const response = await fetch(
            "http://localhost:3001/api/v1/" + "accounts/create",
            {
                method: "POST",
                headers: { "Content-Type": "application/json", authorization },
                body: JSON.stringify({
                    cardNumber,
                }),
            }
        );
        const { success, result, error, message } = await response.json();
        if (!success) {
            console.log(error, message);
            setMessage(message);
        } else console.log(result);
    };

    const handleAccountSetup = async () => {
        event.preventDefault();
        await profileEdit();
        await createAccount();
        navigate("/");
    };

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
                        accept='image/*'
                        onChange={(e) => setImgFile(e.target.files[0])}
                        type="file"
                    />
                    <img src="" alt="" />
                </div>
            </div>
            <input
                onChange={(e) => setCardNumber(e.target.value)}
                type="text"
                placeholder="Card Number"
            />
            <h4>{message}</h4>
            <button onClick={() => handleAccountSetup()}>
                Profile Complete
            </button>
        </main>
    );
};

export default SetupAccount;
