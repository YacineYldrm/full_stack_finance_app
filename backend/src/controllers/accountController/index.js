import createCtrl from "./createCtrl.js";
import getAccountsCtrl from "./getAccountsCtrl.js";
import editCtrl from "./editCtrl.js";
import editTransactionCtrl from "./editTransactionCtrl.js";
import deleteCtrl from "./deleteCtrl.js";

import addTransactionCtrl from "./addTransactionCtrl.js";
const accountController = {
    create: createCtrl,
    getAccounts: getAccountsCtrl,
    edit: editCtrl,
    editTransaction: editTransactionCtrl,
    addTransaction: addTransactionCtrl,
    delete: deleteCtrl,
};

export default accountController;
