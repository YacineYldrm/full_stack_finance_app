import accountServices from "../../services/accountServices/index.js";
import catchAsync from "../../utils/catchAsync.js";

const addTransactionCtrl = catchAsync(async(req,res)=>{
    const transactionInfo = JSON.parse(req.body.transactionInfo)
    const userId = req.authorizedUser
    const reqFile = req.file
    const result = await accountServices.addTransaction(transactionInfo,userId,reqFile)
    res.json({success: true, result})
})

export default addTransactionCtrl