import userServices from "../../services/userServices/index.js";

import catchAsync from "../../utils/catchAsync.js";
import status from "../../utils/status.js";

const getAllUserCtrl = catchAsync(async (_, res) => {
    const allUsers = await userServices.getAllUser();
    res.status(status.OK).json({ success: true, result: allUsers });
});

export default getAllUserCtrl;
