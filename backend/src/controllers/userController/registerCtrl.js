import userServices from "../../services/userServices/index.js";
import catchAsync from "../../utils/catchAsync.js";
import status from "../../utils/status.js";




const registerCtrl = catchAsync(async (req, res) => {
    const registrationData = req.body;
    const registeredUser = await userServices.register(registrationData)
    res.status(status.CREATED).json({ success: true, result: registeredUser })
})


export default registerCtrl;