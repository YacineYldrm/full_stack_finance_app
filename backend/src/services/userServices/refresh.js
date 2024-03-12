import createToken from "../../jwt/createToken.js";
import User from "../../models/User.js";

const refresh = async (userId) => {
    const activeUser = await User.findById(userId);
    const newAccessToken = createToken(userId);
    return { activeUser: activeUser.generateUserInfo(), newAccessToken };
};

export default refresh;
