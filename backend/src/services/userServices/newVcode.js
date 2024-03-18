import User from '../../models/User.js'
import sendMail from '../../utils/sendverificationMail.js'

const newVcode = async(email)=>{
    const foundUser = await User.findOne({email})
    if(!foundUser) throw new Error("User with this E-mail doesn't exist!")
    if(foundUser.verified) throw new Error("User is already verified!")
    const v_code = Math.random().toString().slice(2, 8);
    foundUser.v_code = v_code
    foundUser.save()
    await sendMail(v_code, foundUser.generateUserInfo());
    return "New Verification Code has been sent to your E-mail, please check your mailbox."
}
export default newVcode