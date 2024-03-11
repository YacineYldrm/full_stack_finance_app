import editCtrl from "./editCtrl.js";
import loginCtrl from "./loginCtrl.js";
import registerCtrl from "./registerCtrl.js";
import getAllUserCtrl from "./getAllUserCtrl.js";
import logoutCtrl from "./logoutCtrl.js";

import refreshCtrl from "./refreshCtrl.js";

const userController = {
    getAllUser: getAllUserCtrl,
    edit: editCtrl,
    login: loginCtrl,
    register: registerCtrl,
    logout: logoutCtrl,
    refresh: refreshCtrl,
};

export default userController;
