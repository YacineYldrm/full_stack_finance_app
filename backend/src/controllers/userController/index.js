import editCtrl from "./editCtrl.js";
import loginCtrl from "./loginCtrl.js";
import registerCtrl from "./registerCtrl.js";
import getAllUserCtrl from "./getAllUserCtrl.js";
import logoutCtrl from "./logoutCtrl.js";

import refreshCtrl from "./refreshCtrl.js";
import verifyCtrl from "./verifyCtrl.js";

const userController = {
    getAllUser: getAllUserCtrl,
    edit: editCtrl,
    login: loginCtrl,
    register: registerCtrl,
    verify: verifyCtrl,
    logout: logoutCtrl,
    refresh: refreshCtrl,
};

export default userController;
