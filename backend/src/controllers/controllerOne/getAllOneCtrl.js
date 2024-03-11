import servicesOne from "../../services/servicesOne.js/index.js";
import catchAsync from "../../utils/catchAsync.js";
import status from "../../utils/status.js";



const getAllOneCtrl = catchAsync(async (_, res) => {
    const allOne = await servicesOne.getAllOne();
    res.status(status.OK).json({ success: true, result: allOne });
});

export default getAllOneCtrl;