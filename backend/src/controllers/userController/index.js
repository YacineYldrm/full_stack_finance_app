import getAllUserCtrl from "./getAllUserCtrl.js";
import { loginCtrl } from "./loginCtrl.js";

const userController = {
    getAllUser: getAllUserCtrl,
    login: loginCtrl
};

export default userController;
