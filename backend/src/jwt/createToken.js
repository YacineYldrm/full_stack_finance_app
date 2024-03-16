import "dotenv/config"
import jwt from "jsonwebtoken"

const JWT_SECRET = process.env.JWT_SECRET

const createToken = (userId, tokenType = "access") => {
    const expiresIn = {
        "access": "30min",
        "refresh": "10day"
    }[tokenType] || "3min"
    const token = jwt.sign({ sub: userId, type: tokenType }, JWT_SECRET, { expiresIn })

    return token;
}

export default createToken;