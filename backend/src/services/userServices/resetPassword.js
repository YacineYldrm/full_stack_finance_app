import createToken from "../../jwt/createToken.js";
import User from "../../models/User.js"
import { hasher } from "../../utils/hasher.js";
import sendPasswordResetMail from "../../utils/sendPasswordResetMail.js";


const resetPassword = async (req) => {

    const { email } = req.body
    const foundUser = await User.findOne({ email });
    if (!foundUser) throw new Error("User doesn't exist!")
    const resetToken = createToken(foundUser._id)
    await sendPasswordResetMail(resetToken, foundUser.generateUserInfo())
    return "Email has been sent to your email Adress"

}

export default resetPassword