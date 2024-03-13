import "dotenv/config";
import jwt from "jsonwebtoken";
import catchAsync from "../utils/catchAsync.js";

const JWT_SECRET = process.env.JWT_SECRET;

const makeJwtAuth = (tokenType = "access") =>
    catchAsync(async (req, _, next) => {
        const token = extractToken(req, tokenType);
        const { type, sub } = jwt.verify(token, JWT_SECRET);
        if (type !== tokenType) throw new Error("Invalid tokentype!!!");
        req.authorizedUser = sub;
        next();
    });

const extractToken = (req, tokenType) => {
    console.log(tokenType);

    if (tokenType === "refresh") return req.session.refreshToken;

    const authorization = req.headers.authorization;

    if (!authorization)
        throw new Error("Authorization needed, No authorization found!!!");

    const [authType, token] = authorization.split(" ");

    console.log(authType);
    if (authType !== "Bearer") throw new Error("invalid Authorization Type");

    if (!token) throw new Error("Token not found!!!");

    return token;
};

export default makeJwtAuth;
