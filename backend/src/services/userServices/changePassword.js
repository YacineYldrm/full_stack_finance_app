import User from "../../models/User.js"
import { createSaltHash, hasher } from "../../utils/hasher.js";
import resetPassword from "./resetPassword.js";

const changePassword = async (req) => {
    const userId = req.authorizedUser
    const passwordInfo = req.body
    const forgotPassword = req.body.forgotPassword || false

    if (forgotPassword) {
        const { newPassword } = req.body

        const foundUser = await User.findById(userId)
        if (!foundUser) throw new Error("User doesn't exist")

        const passwordHash = hasher(newPassword, foundUser.saltHash);

        foundUser.passwordHash = passwordHash;

        const updatedUser = await foundUser.save()
        return updatedUser.generateUserInfo()
    }

    const foundUser = await User.findById(userId)
    if (!foundUser) throw new Error("User doesn't exist")

    const hashedPw = hasher(passwordInfo.oldPassword, foundUser.saltHash);
    if (foundUser.passwordHash !== hashedPw) throw new Error("Can't change password, password is wrong");

    const newSaltHash = createSaltHash()
    const newHashedPassword = hasher(passwordInfo.newPassword, newSaltHash)

    foundUser.saltHash = newSaltHash
    foundUser.passwordHash = newHashedPassword
    const updatedUser = await foundUser.save()
    return updatedUser.generateUserInfo()
}

export default changePassword