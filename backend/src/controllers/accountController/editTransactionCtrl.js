import accountServices from "../../services/accountServices/index.js";
import catchAsync from "../../utils/catchAsync.js";
import status from "../../utils/status.js";




const editTransactionCtrl = catchAsync(async (req, res) => {
    const updatedTransaction = await accountServices.editTransaction(req);
    res.status(status.ACCEPTED).json({ success: true, result: updatedTransaction })
}, status.FORBIDDEN);

export default editTransactionCtrl;