import catchAsync from "../../utils/catchAsync.js";
import status from "../../utils/status.js";

const logoutCtrl = catchAsync(async (req, res) => {
    req.session.refreshToken = null;
    res.status(status.OK).json({
        success: true,
        message: "Logout successful!",
    });
});

export default logoutCtrl;
