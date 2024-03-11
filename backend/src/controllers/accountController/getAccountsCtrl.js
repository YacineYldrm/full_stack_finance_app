import accountServices from "../../services/accountServices/index.js";
import catchAsync from "../../utils/catchAsync.js";

const getAccountsCtrl = catchAsync(async(req,res)=>{
    const userId = req.authorizedUser
    const result = await accountServices.getAccounts(userId)
    res.json({success: true, result})
})

export default getAccountsCtrl