import express from "express";
import accountController from "../controllers/accountController/index.js";
import makeJwtAuth from "../jwt/makeJwtAuth.js";

const accountRouter = express
    .Router()
    .post("/edit", makeJwtAuth(), accountController.edit)
    .post("/create", makeJwtAuth(), accountController.create)
    .get("/", makeJwtAuth(), accountController.getAccounts)
    .delete("/:accountId", makeJwtAuth(), accountController.delete);

export default accountRouter;
