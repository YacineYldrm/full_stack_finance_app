import accountServices from "../../services/accountServices/index.js";
import catchAsync from "../../utils/catchAsync.js";
import status from "../../utils/status.js";

const deleteTransactionCtrl = catchAsync(async (req, res) => {
    console.log(req.params.transactionId);
    const userId = req.authorizedUser;
    const transactionId = req.params.transactionId;
    const updatedAccount = await accountServices.deleteTransaction(
        userId,
        transactionId
    );
    res.status(status.OK).json({ success: true, result: updatedAccount });
}, status.FORBIDDEN);

export default deleteTransactionCtrl;
