import getAllUser from "./getAllUser.js";
import { loginService } from "./loginService.js";
import register from "./register.js";
import verify from "./verify.js";

const userServices = {
    getAllUser,
    loginService,
    register,
    verify
};

export default userServices;
