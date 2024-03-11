import crypto from "crypto";


export const hasher = (password, saltHash) => {
    const passwordhash = crypto.createHash("sha512").update(password).digest("hex");
    const hashedPassword = crypto.createHash("sha512").update(passwordhash + saltHash).digest("hex");
    return hashedPassword
}



export const createSaltHash = () => {
    const salt = crypto.randomBytes(64).toString("base64");
    const saltHash = crypto.createHash("sha512").update(salt).digest("hex");
    return saltHash
}