import { useState } from "react";
import logo from "../../../public/logo.png";
import "./SetupAccount.scss";
import { useNavigate } from "react-router-dom";

const SetupAccount = ({ provider }) => {
    const [imgFile, setImgFile] = useState(null);
    const [cardNumber, setCardNumber] = useState(null);
    const [message, setMessage] = useState("");

    const navigate = useNavigate();

    const profileEdit = async () => {
        const authorization = provider.authorization;
        const userInfo = JSON.stringify(provider.activeUser);
        const fd = new FormData();
        fd.append("userInfo", userInfo);
        imgFile ? fd.append("image", imgFile, imgFile.name) : null;
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
        } else console.log(result);
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
                                : "https://i.etsystatic.com/27443014/r/il/d58347/4721440813/il_570xN.4721440813_f7e4.jpg"
                        }
                        alt="profile picture"
                    />
                </div>
                <div>
                    <input
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
