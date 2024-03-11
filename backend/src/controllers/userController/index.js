import editCtrl from "./editCtrl.js";
import loginCtrl from "./loginCtrl.js";
import registerCtrl from "./registerCtrl.js";
import getAllUserCtrl from "./getAllUserCtrl.js";
import logoutCtrl from "./logoutCtrl.js";

const userController = {
    getAllUser: getAllUserCtrl,
    edit: editCtrl,
    login: loginCtrl,
    register: registerCtrl,
    logout: logoutCtrl,
};

export default userController;
