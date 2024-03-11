import create from "./create.js";
import _delete from "./delete.js";
import edit from "./edit.js";
import getAccounts from "./getAccounts.js";

const accountServices = {
    create,
    getAccounts,
    edit,
    _delete,
};

export default accountServices;
