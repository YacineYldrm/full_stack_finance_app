import express from "express";
import makeJwtAuth from "../jwt/makeJwtAuth.js";
import userController from "../controllers/userController/index.js";
import joiError from "../joi/joi.js";

const userRouter = express
    .Router()
    .get("/", userController.getAllUser)
    .post("/edit", makeJwtAuth(), userController.edit)
    .post("/login", userController.login)
    .post("/register", joiError(), userController.register)
    .get("/logout", makeJwtAuth(), userController.logout)
    .get("/refresh", makeJwtAuth("refresh"), userController.refresh)
    .post("/verify", userController.verify)
    .post("/get-user", userController.getUser)
    .post("/change-password", makeJwtAuth(), userController.changePassword)
    .post("/change-email", makeJwtAuth(), userController.changeEmail)
    .delete("/delete", makeJwtAuth(), userController.deleteUser)
    .post("/reset-password", userController.resetPassword)
export default userRouter;
