// -------------------------Imports---------------------------
import "./Login.scss";
import {
    logo,
    useNavigate,
    useState,
    backendUrl,
    Link,
    silentRefresh,
    Button,
    closedEye,
    openEye,
} from "../../utils/files";

// -------------------------Imports---------------------------

const Login = ({ provider }) => {
    // -------------------------States---------------------------

    const [loginInfo, setLoginInfo] = useState({});
    const [message, setMessage] = useState(null);
    const [seePassword, setSeePassword] = useState(false);
    const navigate = useNavigate();
    console.log(loginInfo);

    // --------------------Triggers on click-----------------------
    //    Logs the User in and gets AccessToken and RefreshToken
    // ----------------------------------------------------------

    const login = async () => {
        event.preventDefault();
        if (loginInfo.passoword === "" || loginInfo.email === "") {
            setMessage("Please enter your email and passowrd");
            return;
        }

        const loginFetch = await fetch(`${backendUrl}users/login`, {
            method: "POST",
            credentials: "include",
            body: JSON.stringify(loginInfo),
            headers: { "Content-Type": "application/json" },
        });
        const { success, result, accessToken, error, message } =
            await loginFetch.json();
        if (!success) {
            setMessage(message);
        } else {
            if (!result.verified) {
                navigate(`/verify/${result._id}`);
            } else if (result.verified && result.accounts.length <= 0) {
                provider.setAuthorization(`Bearer ${accessToken}`);
                provider.setActiveUser(result);
                silentRefresh(accessToken, provider.setAuthorization);
                navigate("/account/setup");
            } else {
                provider.setAuthorization(`Bearer ${accessToken}`);
                provider.setActiveUser(result);
                silentRefresh(accessToken, provider.setAuthorization);
                navigate("/home");
            }
        }
    };

    // ---------------------------------------------------------------------

    return (
        <>
            <main className="login">
                <div>
                    <img src={logo} alt="Finco-Logo" />
                </div>
                <div>
                    <h2>Welcome back!</h2>
                    <p>Please Login to keep your finances organized.</p>
                </div>
                <form>
                    <div>
                        <label>
                            <input
                                type="email"
                                placeholder="Email"
                                onChange={(e) =>
                                    setLoginInfo({
                                        ...loginInfo,
                                        email: e.target.value,
                                    })
                                }
                            />
                        </label>
                        <label>
                            <input
                                type={seePassword ? "text" : "password"}
                                placeholder="Password"
                                onChange={(e) =>
                                    setLoginInfo({
                                        ...loginInfo,
                                        password: e.target.value,
                                    })
                                }
                            />
                            <img
                                onClick={() => setSeePassword(!seePassword)}
                                src={seePassword ? openEye : closedEye}
                                alt=""
                            />
                        </label>
                    </div>
                    <h6 onClick={() => navigate("/forgot-password")}>
                        Forgot password?
                    </h6>
                    <p style={{ color: "#CC4C30", fontWeight: "600" }}>
                        {message}
                    </p>

                    <Button btnContent={"Login"} btnFunction={login} />
                </form>
                <p>
                    Don’t have an account? <Link to="/register">Sign up</Link>
                </p>
            </main>
        </>
    );
};

export default Login;
