import userServices from "../../services/userServices/index.js";
import catchAsync from "../../utils/catchAsync.js";

const deleteUserCtrl = catchAsync(async(req,res)=>{
    const userId = req.authorizedUser
    const password = req.body.password
    const result = await userServices.deleteUser(userId,password)
    req.session= null
    res.json({success: true, result})
})

export default deleteUserCtrl