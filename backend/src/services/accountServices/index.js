import create from "./create.js";
import edit from "./edit.js";
import editTransaction from "./editTransaction.js";
import getAccounts from "./getAccounts.js";

const accountServices = {
    create,
    getAccounts,
    edit,
    editTransaction,
};

export default accountServices;
