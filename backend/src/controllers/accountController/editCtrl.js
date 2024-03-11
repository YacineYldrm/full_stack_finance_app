import accountServices from "../../services/accountServices/index.js";
import catchAsync from "../../utils/catchAsync.js";
import status from "../../utils/status.js";

const editCtrl = catchAsync(async (req, res) => {
    const authorizedUserId = req.authorizedUserId;
    const accountInfo = req.body;
    const updatedAccount = await accountServices.edit(
        authorizedUserId,
        accountInfo
    );
    res.status(status.OK).json({ success: true, result: updatedAccount });
}, status.UNAUTHORIZED);

export default editCtrl;
