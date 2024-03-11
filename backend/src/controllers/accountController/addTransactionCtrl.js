import accountServices from "../../services/accountServices/index.js";
import catchAsync from "../../utils/catchAsync.js";

const addTransactionCtrl = catchAsync(async(req,res)=>{
    const transactionInfo = req.body
    const userId = req.authorizedUser
    const result = await accountServices.addTransaction(transactionInfo,userId)
    res.json({success: true, result})
})

export default addTransactionCtrl