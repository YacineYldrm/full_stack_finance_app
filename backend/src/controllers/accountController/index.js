import createCtrl from "./createCtrl.js";
import getAccountsCtrl from "./getAccountsCtrl.js"


const accountController = {
    create: createCtrl,
    getAccounts: getAccountsCtrl,
}

export default accountController;