import getAllUserCtrl from "./getAllUserCtrl.js";
import { loginCtrl } from "./loginCtrl.js";
import registerCtrl from "./registerCtrl.js";
const userController = {
    getAllUser: getAllUserCtrl,
    login: loginCtrl,
    register: registerCtrl,
};

export default userController;
