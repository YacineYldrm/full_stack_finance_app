// -------------------------Imports---------------------------

import "./Register.scss";
import {
    logo,
    useNavigate,
    useState,
    backendUrl,
    useEffect,
    Link,
    Button,
    closedEye,
    openEye,
} from "../../utils/files";

// -------------------------Imports---------------------------

const Register = () => {
    // -------------------------States---------------------------

    const [userInfo, setUserInfo] = useState({});
    const [message, setMessage] = useState("");
    const [accepted, setAccepted] = useState(false);
    const [seePassword, setSeePassword] = useState(false);
    const navigate = useNavigate();

    // -------------------------States---------------------------

    // --------------------Renders on click-----------------------------
    //    sends UserData to server to create user in Database and send a verification email
    // -----------------------------------------------------------------

    const handleRegistration = async () => {
        event.preventDefault();

        if (!accepted) {
            setMessage("Please accept our Terms and Services!");
            return;
        }

        const registrationFetch = await fetch(backendUrl + "users/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(userInfo),
        });

        const { success, result, error, message } =
            await registrationFetch.json();
        if (!success) {
            if (error.includes("required pattern")) {
                setMessage(
                    "Password must include at least: 8 Characters, 1 upper case letter, 1 lower case letter, 1 special character"
                );
            } else {
                console.log(error, message);
                setMessage(error, message);
            }
        } else {
            setMessage("Thank you! Your registration was successful!");
            navigate(`/verify/${result._id}`);
        }
    };

    // ---------------------------------------------------------------------

    return (
        <main className="registration">
            <div>
                <img src={logo} alt="finoccio logo" />
            </div>
            <div>
                <h2>Create an account</h2>
                <p>
                    Welcome to Finoccio! Take control of your finances. Track your
                    spending and income to keep your finances organized.
                </p>
            </div>
            <div>
                <form>
                    <label>
                        <input
                            onChange={(e) =>
                                setUserInfo({
                                    ...userInfo,
                                    firstName: e.target.value,
                                })
                            }
                            type="text"
                            placeholder="First Name"
                        />
                    </label>
                    <label>
                        <input
                            onChange={(e) =>
                                setUserInfo({
                                    ...userInfo,
                                    lastName: e.target.value,
                                })
                            }
                            type="text"
                            placeholder="Last Name"
                        />
                    </label>
                    {/* <input
						onChange={(e) =>
							setUserInfo({
								...userInfo,
								birthDay: new Date(e.target.value).getTime(),
							})
						}
						type='date'
						defaultValue={new Date().toISOString().slice(0, 10)}
					/> */}
                    <label>
                        <input
                            onChange={(e) =>
                                setUserInfo({
                                    ...userInfo,
                                    email: e.target.value.toLowerCase(),
                                })
                            }
                            type="text"
                            placeholder="Email"
                        />
                    </label>
                    <label>
                        <input
                            onChange={(e) =>
                                setUserInfo({
                                    ...userInfo,
                                    password: e.target.value,
                                })
                            }
                            type={seePassword ? "text" : "password"}
                            placeholder="Password"
                        />
                        <img
                            onClick={() => setSeePassword(!seePassword)}
                            src={seePassword ? openEye : closedEye}
                            alt=""
                        />
                    </label>

                    <label>
                        <input
                            onChange={(e) =>
                                setUserInfo({
                                    ...userInfo,
                                    phoneNumber: e.target.value,
                                })
                            }
                            type="text"
                            placeholder="Phone"
                        />
                    </label>
                    <label>
                        <input
                            onClick={() => setAccepted(true)}
                            type="checkbox"
                            name=""
                            id=""
                        />{" "}
                        <p>
                            Agree to our <b>Terms and Services</b>
                        </p>
                    </label>
                </form>
            </div>
            {message ? (
                <p
                    style={{
                        color: "#CC4C30",
                        fontWeight: "600",
                        width: "40vmax",
                        marginInline: "auto",
                    }}
                >
                    {message}
                </p>
            ) : null}
            <div>
                <Button
                    btnContent={"Register Now"}
                    btnFunction={handleRegistration}
                />
            </div>
            <p>
                Already have an account? <Link to="/login">Login</Link>
            </p>
        </main>
    );
};

export default Register;
