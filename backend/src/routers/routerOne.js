import express from "express"
import controllerOne from "../controllers/controllerOne/index.js";
import makeJwtAuth from "../jwt/makeJwtAuth.js";






const routerOne = express.Router()
    .get("/", makeJwtAuth(), controllerOne.getAllOne)





export default routerOne;    
