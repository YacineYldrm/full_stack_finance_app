import User from "../../models/User.js";
import fs from "fs";
import fsAsync from "fs/promises";

const edit = async (userId, userInfo, reqFile) => {
    const foundUser = await User.findById(userId);
    if (!foundUser) throw new Error("User doesn't exist");

    if (reqFile && foundUser.profileImage !== "placeholderImg.svg") {
        const imageFile = fs.existsSync(`./data/${foundUser.profileImage}`);
        if (imageFile) {
            await fsAsync.unlink(
                `./data/${foundUser.profileImage}`,
                (err) => err && console.log(err)
            );
        }
    }
    foundUser.firstName = userInfo.firstName;
    foundUser.lastName = userInfo.lastName;
    foundUser.profileImage = reqFile
        ? reqFile.filename
        : foundUser.profileImage;

    const updatedUser = await foundUser.save();
    return updatedUser.generateUserInfo();
};

export default edit;
