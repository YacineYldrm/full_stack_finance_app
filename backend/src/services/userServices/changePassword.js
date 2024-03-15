import User from "../../models/User.js"
import { createSaltHash, hasher } from "../../utils/hasher.js";

const changePassword = async(userId, passwordInfo)=>{
    const foundUser = await User.findById(userId)
    if(!foundUser) throw new Error("User doesn't exist")
    const hashedPw = hasher(passwordInfo.oldPassword, foundUser.saltHash);
    if (foundUser.passwordHash !== hashedPw)throw new Error("Can't change password, password is wrong");
    const newSaltHash = createSaltHash()
    const newHashedPassword = hasher(passwordInfo.newPassword, newSaltHash)
    foundUser.saltHash = newSaltHash
    foundUser.passwordHash = newHashedPassword
    const updatedUser = await foundUser.save()
    return updatedUser.generateUserInfo()
}

export default changePassword