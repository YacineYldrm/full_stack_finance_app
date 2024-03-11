import createCtrl from "./createCtrl.js";
import getAccountsCtrl from "./getAccountsCtrl.js";
import editCtrl from "./editCtrl.js";

const accountController = {
    create: createCtrl,
    getAccounts: getAccountsCtrl,
    edit: editCtrl,
};

export default accountController;
