import editCtrl from "./editCtrl.js";
import loginCtrl from "./loginCtrl.js";
import registerCtrl from "./registerCtrl.js";
import getAllUserCtrl from "./getAllUserCtrl.js";
import logoutCtrl from "./logoutCtrl.js";
import getUserCtrl from "./getUserCtrl.js";
import refreshCtrl from "./refreshCtrl.js";
import verifyCtrl from "./verifyCtrl.js";
import changePasswordCtrl from "./changePasswordCtrl.js";
import changeEmailCtrl from "./changeEmailCtrl.js";
import deleteUserCtrl from "./deleteUserCtrl.js";
import resetPasswordCtrl from "./resetPasswordCtrl.js";
import newVcodeCtrl from "./newVcodeCtrl.js";


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
    changeEmail: changeEmailCtrl,
    deleteUser: deleteUserCtrl,
    resetPassword: resetPasswordCtrl,
    newVcode: newVcodeCtrl,
};

export default userController;
