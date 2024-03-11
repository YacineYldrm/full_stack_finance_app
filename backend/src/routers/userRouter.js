import express from "express";
import makeJwtAuth from "../jwt/makeJwtAuth.js";
import userController from "../controllers/userController/index.js";

const userRouter = express
    .Router()
    .get("/", userController.getAllUser)
    .post("/edit", makeJwtAuth(), userController.edit)
    .post("/login", userController.login)
    .post("/register", userController.register)
    .get("/logout", makeJwtAuth(), userController.logout)
    .get("/refresh", makeJwtAuth("refresh"), userController.refresh)
    .post("/verify", userController.verify);
export default userRouter;
