import editCtrl from "./editCtrl.js";
import loginCtrl from "./loginCtrl.js";
import registerCtrl from "./registerCtrl.js";
import getAllUserCtrl from "./getAllUserCtrl.js";
import logoutCtrl from "./logoutCtrl.js";
import getUserCtrl from "./getUserCtrl.js";
import refreshCtrl from "./refreshCtrl.js";
import verifyCtrl from "./verifyCtrl.js";
import changePasswordCtrl from "./changePasswordCtrl.js";
const userController = {
    getAllUser: getAllUserCtrl,
    edit: editCtrl,
    login: loginCtrl,
    register: registerCtrl,
    verify: verifyCtrl,
    logout: logoutCtrl,
    refresh: refreshCtrl,
    getUser: getUserCtrl,
    changePassword: changePasswordCtrl,
};

export default userController;
