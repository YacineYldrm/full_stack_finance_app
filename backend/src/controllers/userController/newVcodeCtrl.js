import userServices from "../../services/userServices/index.js"
import catchAsync from "../../utils/catchAsync.js";

const newVcodeCtrl = catchAsync(async(req,res)=>{
    const { email } = req.body
    const result = await userServices.newVcode(email)
    res.json({success: true, result})
})

export default newVcodeCtrl