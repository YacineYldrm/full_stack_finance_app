import express from "express";
import accountController from "../controllers/accountController/index.js";
import makeJwtAuth from "../jwt/makeJwtAuth.js";

const accountRouter = express
    .Router()
    .post("/edit", makeJwtAuth(), accountController.edit)
    .post("/create", makeJwtAuth(), accountController.create)
    .get("/", makeJwtAuth(), accountController.getAccounts)
    .post("/add-transaction",makeJwtAuth(),accountController.addTransaction)
    .post("/edit-transaction", makeJwtAuth(), accountController.editTransaction)

export default accountRouter;
