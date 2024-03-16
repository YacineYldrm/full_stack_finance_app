import userServices from "../../services/userServices/index.js";
import catchAsync from "../../utils/catchAsync.js";
import status from "../../utils/status.js";




const resetPasswordCtrl = catchAsync(async (req, res) => {
    const result = await userServices.resetPassword(req);
    res.status(status.ACCEPTED).json({ success: true, result })
})



export default resetPasswordCtrl;