import userServices from "../../services/userServices/index.js";
import catchAsync from "../../utils/catchAsync.js";

const loginCtrl = catchAsync(async (req, res) => {
    const { result, accessToken, refreshToken } = await userServices.login(
        req.body
    );
    req.session.refreshToken = refreshToken;
    res.json({ success: true, accessToken, result });
});

export default loginCtrl;
