import createCtrl from "./createCtrl.js";
import getAccountsCtrl from "./getAccountsCtrl.js";
import editCtrl from "./editCtrl.js";
import editTransactionCtrl from "./editTransactionCtrl.js";


const accountController = {
    create: createCtrl,
    getAccounts: getAccountsCtrl,
    edit: editCtrl,
    editTransaction: editTransactionCtrl,
};

export default accountController;
