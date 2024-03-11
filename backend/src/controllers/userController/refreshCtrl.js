import userServices from "../../services/userServices/index.js";
import catchAsync from "../../utils/catchAsync.js";
import status from "../../utils/status.js";





const refreshCtrl = catchAsync(async (req, res) => {
    const userId = req.authorizedUser;
    const newAccessToken = await userServices.refresh(userId);
    res.status(status.CREATED).json({ success: true, result: newAccessToken });
})

export default refreshCtrl;
