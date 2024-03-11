import express from "express";
import accountController from "../controllers/accountController/index.js";
import makeJwtAuth from "../jwt/makeJwtAuth.js";
import accountController from "../controllers/accountController/index.js";

const accountRouter = express
    .Router()
    .post("/edit", makeJwtAuth(), accountController.edit)
    .post("/create", makeJwtAuth(), accountController.create)
    .get("/", makeJwtAuth(), accountController.getAccounts);

export default accountRouter;
