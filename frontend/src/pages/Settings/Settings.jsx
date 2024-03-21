// -------------------------Imports---------------------------

import "./Settings.scss";

import {
    editPen,
    changeUser,
    arrowright,
    Arrow,
    Button,
    backendUrl,
    mediaUrl,
    useNavigate,
    useState,
    changePasswordIcon,
    changeMail,
    deleteUserIcon,
} from "../../utils/files";
import { useEffect } from "react";

// -------------------------Imports---------------------------

const Settings = ({ provider }) => {
    // -------------------------States---------------------------

    const navigate = useNavigate();
    const [messagePassword, setMessagePassword] = useState(null);
    const [messageEmail, setMessageEmail] = useState(null);
    const [messageName, setMessageName] = useState(null);
    const [messageDelete, setMessageDelete] = useState(null);
    const [successMessage, setSuccessMessage] = useState(false);
    const [image, setImage] = useState();
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState();

    // --------------------Renders on load-----------------------
    //    		gets UserData for the edit inputs
    // ----------------------------------------------------------

    useEffect(() => {
        if (provider.activeUser !== "") {
            const [userFirstname, userLastName] =
                provider.activeUser.user.split(" ");
            setEmail(provider.activeUser.email);
            setFirstName(userFirstname);
            setLastName(userLastName);
        }
    }, [provider.activeUser]);

    // --------------------Renders on click-----------------------
    //    sends User Data to server to find and delete the user
    // ----------------------------------------------------------

    const deleteUser = async () => {
        event.preventDefault();
        const deleteUserFetch = await fetch(`${backendUrl}users/delete`, {
            method: "DELETE",
            body: JSON.stringify({ password }),
            headers: {
                "Content-Type": "application/json",
                authorization: provider.authorization,
            },
        });
        const { success, result, error, message } =
            await deleteUserFetch.json();
        if (!success) {
            console.log(error, message);
            setSuccessMessage(false);
            setMessageName(null);
            setMessageDelete(message);
        } else {
            provider.setAuthorization("");
            navigate("/register");
        }
    };

    // --------------------Renders on click-----------------------
    //    sends newUser Data to server to find and update the user
    // ----------------------------------------------------------

    const editUser = async () => {
        event.preventDefault();
        const fd = new FormData();
        const userInfo = JSON.stringify({ firstName, lastName });
        fd.append("userInfo", userInfo);

        {
            image ? fd.append("image", image) : null;
        }
        const editUserFetch = await fetch(`${backendUrl}users/edit`, {
            method: "POST",
            body: fd,
            headers: { authorization: provider?.authorization },
        });
        const { success, result, error, message } = await editUserFetch.json();
        if (!success) {
            console.log(error, message);
            setSuccessMessage(false);
            if (typeof error === "object") {
                if (error.message.includes("Name"))
                    setMessageName("Please enter your first and last name");
            }
        } else {
            provider?.setActiveUser(result);
            setMessageDelete(null);
            setSuccessMessage(true);
            setMessageName("Username changed successfully");
        }
    };

    // --------------------Renders on click-----------------------
    //    sends new password to server to find and update the user
    // ----------------------------------------------------------

    const changePassword = async () => {
        event.preventDefault();
        setMessageEmail(null);
        setMessageDelete(null);
        setMessageName(null);
        const passwordInfo = { oldPassword, newPassword };
        const changePasswordFetch = await fetch(
            `${backendUrl}users/change-password`,
            {
                method: "POST",
                body: JSON.stringify(passwordInfo),
                headers: {
                    "Content-Type": "application/json",
                    authorization: provider.authorization,
                },
            }
        );
        const { success, result, error, message } =
            await changePasswordFetch.json();
        if (!success) {
            console.log(error, message);
            setSuccessMessage(false);

            if (typeof error !== "object") {
                if (error.includes("oldPassword")) {
                    setMessagePassword(
                        "Can't change password, password is wrong"
                    );
                } else if (error.includes("empty")) {
                    setMessagePassword("Please enter new password");
                } else if (error.includes("required pattern")) {
                    setMessagePassword(
                        "Password must include at least: 8 Characters, 1 upper case letter, 1 lower case letter, 1 special character"
                    );
                }
            } else {
                setSuccessMessage(false);
                setMessagePassword("Can't change password, password is wrong");
            }
        } else {
            provider.setAuthorization("");
            navigate("/login");
        }
    };

    // --------------------Renders on click-----------------------
    //    sends new email to server to find and update the user and send verification email
    // ----------------------------------------------------------

    const changeEmail = async () => {
        event.preventDefault();
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
            setSuccessMessage(false);
            setMessageEmail(message);
        } else {
            provider.setAuthorization("");
            navigate("/login");
        }
    };
    // --------------------Renders on click-----------------------
    //    		toggles the accordion open and close
    // ----------------------------------------------------------

    const toggleDisplayOption = (idName) => {
        const option = document.getElementById(idName);
        const optionSibling = document.getElementById(idName).nextSibling;
        option.classList.toggle("rotate_arrow");
        optionSibling.classList.toggle("display_option_inputs");
    };

    // ---------------------------------------------------------------------

    return (
        <>
            <main className="settings">
                <div>
                    <Arrow onClick={() => navigate("/menu")} />
                </div>
                <h3>Settings</h3>
                <section>
                    <div className="image_edit_main">
                        <form className="image_edit_wrapper">
                            <img
                                src={
                                    image
                                        ? URL.createObjectURL(image)
                                        : `${mediaUrl}${provider?.activeUser?.profileImage}`
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
                        </form>
                        <div>
                            {image ? (
                                <div>
                                    <Button
                                        btnContent={"←"}
                                        btnFunction={() => setImage(null)}
                                    />
                                </div>
                            ) : (
                                <img
                                    className="edit_icon"
                                    src={editPen}
                                    alt="edit icon"
                                />
                            )}
                            {image && (
                                <div>
                                    <Button
                                        btnContent={"⤴"}
                                        btnFunction={editUser}
                                    />
                                </div>
                            )}
                        </div>
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
                                    onFocus={() => setMessagePassword(null)}
                                    type="password"
                                    name=""
                                    placeholder="Password"
                                    onChange={(e) =>
                                        setOldPassword(e.target.value)
                                    }
                                />

                                <input
                                    onFocus={() => setMessagePassword(null)}
                                    type="password"
                                    name=""
                                    placeholder="New password"
                                    onChange={(e) =>
                                        setNewPassword(e.target.value)
                                    }
                                />
                                {messagePassword ? (
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
                                        {messagePassword}
                                    </p>
                                ) : null}
                                <div>
                                    <Button
                                        btnContent={"Change Password"}
                                        btnFunction={changePassword}
                                    />
                                </div>
                            </form>
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
                                    onFocus={() => setMessageEmail(null)}
                                    type="email"
                                    name=""
                                    defaultValue={email}
                                    placeholder="e.g. user@email.com"
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                                {messageEmail ? (
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
                                        {messageEmail}
                                    </p>
                                ) : null}
                                <div>
                                    <Button
                                        btnContent={"Change Email"}
                                        btnFunction={changeEmail}
                                    />
                                </div>
                            </form>
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
                                    onFocus={() => setMessageName(null)}
                                    type="text"
                                    name=""
                                    defaultValue={firstName}
                                    placeholder="First name"
                                    onChange={(e) =>
                                        setFirstName(e.target.value)
                                    }
                                />
                                <input
                                    onFocus={() => setMessageName(null)}
                                    type="text"
                                    name=""
                                    defaultValue={lastName}
                                    placeholder="Last name"
                                    onChange={(e) =>
                                        setLastName(e.target.value)
                                    }
                                />
                                {messageName ? (
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
                                        {messageName}
                                    </p>
                                ) : null}
                                <div>
                                    <Button
                                        btnContent={"Change Name"}
                                        btnFunction={editUser}
                                    />
                                </div>
                            </form>
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
                            <form action="">
                                <label htmlFor="passwordconfirm">
                                    Enter your password and confirm to delete
                                    your profile.
                                </label>
                                <input
                                    onFocus={() => setMessageDelete(null)}
                                    type="password"
                                    name=""
                                    placeholder="Password"
                                    onChange={(e) =>
                                        setPassword(e.target.value)
                                    }
                                />
                                {messageDelete ? (
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
                                        {messageDelete}
                                    </p>
                                ) : null}
                                <div>
                                    <Button
                                        btnContent={"Delete Profile"}
                                        btnFunction={deleteUser}
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

export default Settings;
