import create from "./create.js";
import _delete from "./delete.js";
import edit from "./edit.js";
import editTransaction from "./editTransaction.js";
import getAccounts from "./getAccounts.js";
import addTransaction from "./addTransaction.js";
const accountServices = {
    create,
    getAccounts,
    edit,
    editTransaction,
    addTransaction,
    _delete,
};

export default accountServices;
