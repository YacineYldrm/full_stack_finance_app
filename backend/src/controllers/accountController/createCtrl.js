import accountServices from "../../services/accountServices/index.js";
import catchAsync from "../../utils/catchAsync.js";
import status from "../../utils/status.js";



const createCtrl = catchAsync(async (req, res) => {
    const createdAccount = await accountServices.create(req);
    res.status(status.CREATED).json({ success: true, result: createdAccount });
});


export default createCtrl;
