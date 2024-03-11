import express from "express";
import makeJwtAuth from "../jwt/makeJwtAuth.js";
import accountController from "../controllers/accountController/index.js";

const accountRouter = express
    .Router()
    .post("/create", makeJwtAuth(), accountController.create)
    .get("/",makeJwtAuth(),accountController.getAccounts)

export default accountRouter;
