import userServices from "../../services/userServices/index.js";
import catchAsync from "../../utils/catchAsync.js";

const changePasswordCtrl = catchAsync(async(req,res)=>{
    const userId = req.authorizedUser
    const passwordInfo = req.body
    const result = await userServices.changePassword(userId, passwordInfo)
    res.json({success: true, result})
})

export default changePasswordCtrl