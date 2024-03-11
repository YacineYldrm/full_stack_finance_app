import userServices from "../../services/userServices/index.js";
import catchAsync from "../../utils/catchAsync.js";

const verifyCtrl = catchAsync(async(req,res)=>{
    const result = await userServices.verify(req.body)
    res.json({success:true, result})
})

export default verifyCtrl