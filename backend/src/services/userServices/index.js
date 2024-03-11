import edit from "./edit.js";
import getAllUser from "./getAllUser.js";
import { loginService } from "./loginService.js";
import register from "./register.js";
const userServices = {
    getAllUser,
    edit,
    loginService,
    register,
};

export default userServices;
