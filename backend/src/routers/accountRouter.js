import express from "express";
import makeJwtAuth from "../jwt/makeJwtAuth";
import accountController from "../controllers/accountController/index.js";

const accountRouter = express.Router()
.get("/",makeJwtAuth(),accountController.getAccounts)

export default accountRouter;
