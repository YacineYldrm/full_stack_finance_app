import Account from "../../models/Account.js"
import User from "../../models/User.js"
import { hasher } from "../../utils/hasher.js"
import fs from "fs/promises"
const deleteUser = async(userId, password)=>{
    const foundUser = await User.findById(userId)
    if(!foundUser) throw new Error("User doesn't exist!")
    const hashedPw = hasher(password,foundUser.saltHash)
    if(hashedPw!==foundUser.passwordHash) throw new Error("Password is wrong, can't delete User")
    const deletedUser = await User.findByIdAndDelete(userId)
    if(!deletedUser) throw new Error("couldn't delete User")
    if(deletedUser.profileImage!==""){
        await fs.unlink(`./data/${deletedUser.profileImage}`);
    }
    await Account.deleteMany({owner: userId})
    return deletedUser.generateUserInfo()
}

export default deleteUser