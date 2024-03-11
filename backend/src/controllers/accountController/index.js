import createCtrl from "./createCtrl.js";
import getAccountsCtrl from "./getAccountsCtrl.js";
import editCtrl from "./editCtrl.js";
import addTransactionCtrl from "./addTransactionCtrl.js";
const accountController = {
    create: createCtrl,
    getAccounts: getAccountsCtrl,
    edit: editCtrl,
    addTransaction: addTransactionCtrl,
};

export default accountController;
