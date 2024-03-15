import accountServices from "../../services/accountServices/index.js";
import catchAsync from "../../utils/catchAsync.js";
import status from "../../utils/status.js";

const deleteCtrl = catchAsync(async (req, res) => {
    const authorizedUserId = req.authorizedUser;
    const accountId = req.body.accountId;
    const password = req.body.password;
    const deletedAccount = await accountServices._delete(
        authorizedUserId,
        accountId,
        password
    );
    res.status(status.OK).json({
        success: true,
        message: "Account deleted successfully!",
        result: deletedAccount,
    });
}, status.FORBIDDEN);

export default deleteCtrl;
