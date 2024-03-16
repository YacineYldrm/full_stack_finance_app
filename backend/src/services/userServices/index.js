import edit from "./edit.js";
import getAllUser from "./getAllUser.js";
import login from "./login.js";
import refresh from "./refresh.js";
import register from "./register.js";
import getUser from "./getUser.js";
import changePassword from "./changePassword.js";
import verify from "./verify.js";
import changeEmail from "./changeEmail.js";
import deleteUser from "./deleteUser.js";
import resetPassword from "./resetPassword.js";
const userServices = {
    getAllUser,
    edit,
    login,
    register,
    refresh,
    verify,
    getUser,
    changePassword,
    changeEmail,
    resetPassword,
    deleteUser
};

export default userServices;
