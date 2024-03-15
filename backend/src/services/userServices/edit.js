import User from "../../models/User.js";
import fs from "fs/promises";

const edit = async (userId, userInfo, reqFile) => {
    const foundUser = await User.findById(userId);
    if (!foundUser) throw new Error("User doesn't exist");

    

    if (reqFile && foundUser.profileImage !== "") {
        await fs.unlink(`./data/${foundUser.profileImage}`);
    }
    foundUser.firstName =userInfo.firstName
    foundUser.lastName = userInfo.lastName
    foundUser.profileImage = reqFile
        ? reqFile.filename
        : foundUser.profileImage;

    const updatedUser = await foundUser.save();
    return updatedUser.generateUserInfo();
};

export default edit;
