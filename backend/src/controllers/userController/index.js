import editCtrl from "./editCtrl.js";
import { loginCtrl } from "./loginCtrl.js";
import registerCtrl from "./registerCtrl.js";
import getAllUserCtrl from "./getAllUserCtrl.js";
const userController = {
    getAllUser: getAllUserCtrl,
    edit: editCtrl,
    login: loginCtrl,
    register: registerCtrl,
};

export default userController;
