import express from "express";
import makeJwtAuth from "../jwt/makeJwtAuth.js";
import userController from "../controllers/userController/index.js";

const userRouter = express.Router().get("/", userController.getAllUser);

export default userRouter;
