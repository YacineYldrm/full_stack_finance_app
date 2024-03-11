import createCtrl from "./createCtrl.js";
import getAccountsCtrl from "./getAccountsCtrl.js";
import editCtrl from "./editCtrl.js";
import deleteCtrl from "./deleteCtrl.js";

const accountController = {
    create: createCtrl,
    getAccounts: getAccountsCtrl,
    edit: editCtrl,
    delete: deleteCtrl,
};

export default accountController;
