import User from "../../models/User.js";
import sendMail from "../../utils/sendverificationMail.js";

const changeEmail = async(userId, email)=>{

        const foundUserMail = await User.findOne({ email: email });
        if (foundUserMail) throw new Error("User with this email already exists!");
    const foundUser = await User.findById(userId)
    foundUser.email = email
    foundUser.verified = false
    const v_code = Math.random().toString().slice(2, 8);
    foundUser.v_code = v_code
    const updatedUser = await foundUser.save()
    await sendMail(v_code, updatedUser.generateUserInfo());
    return updatedUser.generateUserInfo()
}

export default changeEmail