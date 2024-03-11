import User from "../../models/User.js";

const verify = async (verifyInfo) => {
    const { userId, v_code } = verifyInfo;

    console.log(v_code);
    const foundUser = await User.findById(userId);
    console.log(foundUser.v_code);
    if (!foundUser) throw new Error("User doesn't exist");
    if (foundUser.v_code !== v_code) throw new Error("Six digit code is wrong");
    foundUser.verified = true;
    await foundUser.save();
    return foundUser.generateUserInfo();
};

export default verify;
