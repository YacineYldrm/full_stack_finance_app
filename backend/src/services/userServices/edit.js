import User from "../../models/User.js";
import fs from "fs/promises";

const edit = async (userId, userInfo, reqFile) => {
    console.log(reqFile);
    console.log(userId);
    const foundUser = await User.findById(userId);
    if (!foundUser) throw new Error("User doesn't exist");

    // userInfo = {cardNumber: ..., profileImage:..., email:...}

    if (foundUser.email !== userInfo.email) {
        const foundUser = await User.findOne({ email: userInfo.email });
        if (foundUser) throw new Error("User with this email already exists!");
    }

    const foundAccount = foundUser.accounts.find(
        (accountNumber) => accountNumber === userInfo.cardNumber
    );

    if (foundAccount)
        throw new Error("Account with this card number already exists!");

    if (reqFile && foundUser.profileImage !== "") {
        await fs.unlink(`./data/${foundUser.profileImage}`);
    }

    foundUser.profileImage = reqFile
        ? reqFile.filename
        : foundUser.profileImage;
    foundUser.accounts = [...foundUser.accounts, userInfo.cardNumber];
    const updatedUser = await foundUser.save();
    return updatedUser.generateUserInfo();
};

export default edit;
