import userServices from "../../services/userServices/index.js";
import catchAsync from "../../utils/catchAsync.js";
import status from "../../utils/status.js";

const editCtrl = catchAsync(async (req, res) => {
    const userId = req.authorizedUser.sub;
    const userInfo = req.body;
    const reqFile = req.file;

    const updatedUser = await userServices.edit(userId, userInfo, reqFile);
    res.status(status.OK).json({ success: true, result: updatedUser });
});

export default editCtrl;
