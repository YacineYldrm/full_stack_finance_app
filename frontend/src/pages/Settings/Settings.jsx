import changePasswordIcon from "../../../public/changePassword.svg";
import changeUser from "../../../public/changeUser.svg";
import changeMail from "../../../public/changeMail.svg";
import deleteUserIcon from "../../../public/deleteUser.svg";
import arrowright from "../../../public/ArrowRight.svg";
import "./Settings.scss";
import { useState } from "react";
import Arrow from "../../../public/svg/Arrows/Arrow";

import { useNavigate } from "react-router-dom";
import { backendUrl } from "../../api";

const Settings = ({ provider }) => {
    const [userFirstName, userLastname] =
        provider?.activeUser?.user?.split(" ");
    const [image, setImage] = useState();
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [changePwDropdown, setChangePwDropdown] = useState(false);
    const [firstName, setFirstName] = useState(userFirstName);
    const [lastName, setLastName] = useState(userLastname);
    const [email, setEmail] = useState(provider.activeUser.email);
    const [password, setPassword] = useState();
    const navigate = useNavigate();

    const deleteUser = async () => {
        const res = await fetch(`${backendUrl}users/delete`, {
            method: "DELETE",
            body: JSON.stringify({ password }),
            headers: {
                "Content-Type": "application/json",
                authorization: provider.authorization,
            },
        });
        const { success, result, error, message } = await res.json();
        if (!success) {
            console.log(error, message);
        } else {
            provider.setAuthorization("");
            navigate("/register");
        }
    };
    const editUser = async () => {
        const fd = new FormData();
        const userInfo = JSON.stringify({ firstName, lastName });
        fd.append("userInfo", userInfo);

        {
            image ? fd.append("image", image) : null;
        }
        const res = await fetch(`${backendUrl}users/edit`, {
            method: "POST",
            body: fd,
            headers: { authorization: provider.authorization },
        });
        const { success, result, error, message } = await res.json();
        if (!success) {
            console.log(error, message);
        } else {
            console.log(result);
            provider.setActiveUser(result);
        }
    };

    const changePassword = async () => {
        const passwordInfo = { oldPassword, newPassword };
        const res = await fetch(`${backendUrl}users/change-password`, {
            method: "POST",
            body: JSON.stringify(passwordInfo),
            headers: {
                "Content-Type": "application/json",
                authorization: provider.authorization,
            },
        });
        const { success, result, error, message } = await res.json();
        if (!success) {
            console.log(error, message);
        } else {
            provider.setAuthorization("");
            navigate("/login");
        }
    };

    const changeEmail = async () => {
        const res = await fetch(`${backendUrl}users/change-email`, {
            method: "POST",
            body: JSON.stringify({ email }),
            headers: {
                "Content-Type": "application/json",
                authorization: provider.authorization,
            },
        });
        const { success, result, error, message } = await res.json();
        if (!success) {
            console.log(error, message);
        } else {
            provider.setAuthorization("");
            navigate("/login");
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
            <main className="settings">
                <div>
                    <Arrow onClick={() => navigate("/menu")} />
                </div>
                <h3>Settings</h3>
                <section>
                    <div>
                        <img
                            src={
                                image
                                    ? URL.createObjectURL(image)
                                    : `http://localhost:3001/${provider?.activeUser?.profileImage}`
                            }
                            alt=""
                        />
                        <input
                            type="file"
                            name=""
                            accept="image/*"
                            id=""
                            onChange={(e) => setImage(e.target.files[0])}
                        />
                        {image ? (
                            <button onClick={() => setImage(null)}>
                                use old
                            </button>
                        ) : (
                            <p>Drop your image here ⬆️ </p>
                        )}
                        {image ? (
                            <button onClick={editUser}>upload new image</button>
                        ) : null}
                    </div>
                    <article className="my_profile_options">
                        <div
                            id="settings1"
                            className="option"
                            onClick={() => toggleDisplayOption("settings1")}
                        >
                            <div>
                                <img src={changePasswordIcon} alt="" />
                                <p>Change Password</p>
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
                                    type="password"
                                    name=""
                                    placeholder="Password"
                                    onChange={(e) =>
                                        setOldPassword(e.target.value)
                                    }
                                />

                                <input
                                    type="password"
                                    name=""
                                    placeholder="New password"
                                    onChange={(e) =>
                                        setNewPassword(e.target.value)
                                    }
                                />
                            </form>
                            <button onClick={changePassword}>
                                Change Password
                            </button>
                        </div>

                        <div
                            id="settings2"
                            className="option"
                            onClick={() => toggleDisplayOption("settings2")}
                        >
                            <div>
                                <img src={changeMail} alt="" />
                                <p>Change Email</p>
                            </div>
                            <img src={arrowright} alt="" />
                        </div>
                        <div className="option_inputs_container">
                            <form>
                                <input
                                    type="email"
                                    name=""
                                    defaultValue={email}
                                    placeholder="e.g. user@email.com"
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </form>
                            <button onClick={changeEmail}>Change Email</button>
                        </div>

                        <div
                            id="settings3"
                            className="option"
                            onClick={() => toggleDisplayOption("settings3")}
                        >
                            <div>
                                <img src={changeUser} alt="" />
                                <p>Change Name</p>
                            </div>
                            <img src={arrowright} alt="" />
                        </div>
                        <div className="option_inputs_container">
                            <form>
                                <input
                                    type="text"
                                    name=""
                                    defaultValue={firstName}
                                    placeholder="First name"
                                    onChange={(e) =>
                                        setFirstName(e.target.value)
                                    }
                                />
                                <input
                                    type="text"
                                    name=""
                                    defaultValue={lastName}
                                    placeholder="Last name"
                                    onChange={(e) =>
                                        setLastName(e.target.value)
                                    }
                                />
                            </form>
                            <button onClick={editUser}>Change Name</button>
                        </div>
                    </article>

                    <article>
                        <div
                            id="settings4"
                            className="option"
                            onClick={() => toggleDisplayOption("settings4")}
                        >
                            <div>
                                <img src={deleteUserIcon} alt="" />
                                <p>Delete Pofile</p>
                            </div>
                            <img src={arrowright} alt="" />
                        </div>
                        <div className="option_inputs_container">
                            <label htmlFor="passwordconfirm">Password</label>
                            <input
                                type="password"
                                name=""
                                onChange={(e) => setPassword(e.target.value)}
                            />

                            <button onClick={deleteUser}>Delete Profile</button>
                        </div>
                    </article>
                </section>
            </main>
        </>
    );
};

export default Settings;
