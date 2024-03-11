import edit from "./edit.js";
import getAllUser from "./getAllUser.js";
import login from "./login.js";
import refresh from "./refresh.js";
import register from "./register.js";


import verify from "./verify.js";

const userServices = {
    getAllUser,
    edit,
    login,
    register,
    refresh,
    verify
};

export default userServices;
