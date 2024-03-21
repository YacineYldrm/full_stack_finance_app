// -------------------------Imports---------------------------

import "./Verify.scss";

import {
    Button,
    logo,
    backendUrl,
    useParams,
    useNavigate,
    useEffect,
    useState,
} from "../../utils/files";

// -------------------------Imports---------------------------

const Verify = () => {
    // -------------------------States---------------------------
    const [message, setMessage] = useState("");
    const params = useParams();
    const userId = params.userId;
    const [verifyInfo, setVerifyInfo] = useState({ userId });
    const navigate = useNavigate();

    // --------------------triggers on Load-----------------------
    // gets Userdata from server to navigate client to the related page
    // ----------------------------------------------------------

    const getUser = async () => {
        const getUserFetch = await fetch(`${backendUrl}users/get-user`, {
            method: "POST",
            body: JSON.stringify(verifyInfo),
            headers: { "Content-Type": "application/json" },
        });
        const { success, result, error, message } = await getUserFetch.json();
        if (!success) {
            navigate("/register");
        } else if (result.verified) {
            navigate("/login");
        }
    };

    useEffect(() => {
        getUser();
    }, []);

    // --------------------triggers on click-----------------------
    // sends verificationData to server update user verified status
    // ----------------------------------------------------------

    const verify = async () => {
        event.preventDefault();
        const verifyFetch = await fetch(`${backendUrl}users/verify`, {
            method: "POST",
            body: JSON.stringify(verifyInfo),
            headers: { "Content-Type": "application/json" },
        });
        const { success, result, error, message } = await verifyFetch.json();
        if (!success) {
            setMessage(message);
            console.log(error, message);
        } else {
            navigate("/login");
        }
    };

    // ---------------------------------------------------------------------

    return (
        <>
            <main className="verify">
                <div>
                    <img src={logo} alt="Finoccio-Logo" />
                </div>
                <div>
                    <h2>Welcome to Finoccio!</h2>
                    <p>
                        Please type in your verification code, to verify your
                        E-mail and get started, to keep your finances organized.
                    </p>
                </div>
                <form>
                    <div>
                        <input
                            type="text"
                            placeholder="Verification Code"
                            onChange={(e) =>
                                setVerifyInfo({
                                    ...verifyInfo,
                                    v_code: e.target.value,
                                })
                            }
                        />
                    </div>

                    <h6 onClick={() => navigate("/forgot-verification")}>
                        Didn't get your Code?
                    </h6>
                    {message ? (
                        <p
                            style={{
                                color: "#CC4C30",
                                fontWeight: "600",
                                width: "40vmax",
                                marginInline: "auto",
                                marginBlock: "2vh",
                            }}
                        >
                            {message}
                        </p>
                    ) : null}

                    <Button btnContent={"Verify"} btnFunction={verify} />
                </form>
            </main>
        </>
    );
};

export default Verify;
