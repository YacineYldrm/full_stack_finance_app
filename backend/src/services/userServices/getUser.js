import User from "../../models/User.js"

const getUser = async (userId)=>{
    const foundUser = await User.findById(userId)
    if(!foundUser) throw new Error("User doesn't exist")
    return foundUser.generateUserInfo()
}

export default getUser