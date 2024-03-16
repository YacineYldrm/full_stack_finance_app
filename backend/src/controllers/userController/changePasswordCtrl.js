import userServices from "../../services/userServices/index.js";
import catchAsync from "../../utils/catchAsync.js";

const changePasswordCtrl = catchAsync(async (req, res) => {

    const result = await userServices.changePassword(req)
    req.session = null
    res.json({ success: true, result })
})

export default changePasswordCtrl