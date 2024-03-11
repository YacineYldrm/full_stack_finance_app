import "dotenv/config"
import jwt from "jsonwebtoken"

const JWT_SECRET = process.env.JWT_SECRET

const createToken = (userInfo, tokenType = "access") => {
    const expiresIn = {
        "access": "10min",
        "refresh": "10day"
    }[tokenType] || "3min"
    const token = jwt.sign({ sub: userInfo, type: tokenType }, JWT_SECRET, { expiresIn })

    return token;
}

export default createToken;