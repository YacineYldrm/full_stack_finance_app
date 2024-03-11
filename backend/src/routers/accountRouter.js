import express from "express";
import accountController from "../controllers/accountController/index.js";

const accountRouter = express.Router().post("/edit", accountController.edit);

export default accountRouter;
