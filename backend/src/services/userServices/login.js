import createToken from "../../jwt/createToken.js";
import User from "../../models/User.js";
import { hasher } from "../../utils/hasher.js";

const login = async (loginInfo) => {
    const { password, email } = loginInfo;

    const foundUser = await User.findOne({ email });
    if (!foundUser) throw new Error(" User doesn't exist");
    const hashedPw = hasher(password, foundUser.saltHash);
    if (foundUser.passwordHash !== hashedPw)
        throw new Error("Password is wrong");
    const accessToken = createToken(foundUser._id);
    const refreshToken = createToken(foundUser._id, "refresh");
    return { result: foundUser, accessToken, refreshToken };
};

export default login;
