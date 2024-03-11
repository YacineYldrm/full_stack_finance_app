import getAllUserCtrl from "./getAllUserCtrl.js";
import { loginCtrl } from "./loginCtrl.js";
import registerCtrl from "./registerCtrl.js";
import verifyCtrl from "./verifyCtrl.js";
const userController = {
    getAllUser: getAllUserCtrl,
    login: loginCtrl,
    register: registerCtrl,
    verify: verifyCtrl
};

export default userController;
