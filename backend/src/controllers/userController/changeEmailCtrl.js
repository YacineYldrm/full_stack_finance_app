import userServices from "../../services/userServices/index.js";
import catchAsync from "../../utils/catchAsync.js";

const changeEmailCtrl = catchAsync(async(req,res)=>{
    const userId = req.authorizedUser
    const email = req.body.email
    const result = await userServices.changeEmail(userId,email)
    req.session = null
    res.json({success: true, result})
})

export default changeEmailCtrl