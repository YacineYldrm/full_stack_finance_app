import express from "express";
import accountController from "../controllers/accountController.js";
import makeJwtAuth from "../jwt/makeJwtAuth.js";

const accountRouter = express
    .Router()
    .post("/create", makeJwtAuth(), accountController.create)

export default accountRouter;
