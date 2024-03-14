import userServices from "../../services/userServices/index.js";
import catchAsync from "../../utils/catchAsync.js";

const getUserCtrl = catchAsync(async(req,res)=>{
    const userId = req.body.userId
    const result = await userServices.getUser(userId)
    res.json({success: true, result})
})

export default getUserCtrl