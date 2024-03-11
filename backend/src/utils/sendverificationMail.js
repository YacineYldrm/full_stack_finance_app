import { google } from "googleapis";
import nodemailer from "nodemailer";
import "dotenv/config";
import createMailContent from "./createMailContent.js";

const REFRESH_TOKEN = process.env.REFRESH_TOKEN;
const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const MAIL_URL = process.env.MAIL_URL
const FRONTEND_URL = process.env.FRONTEND_URL + "/verify"

console.log(REFRESH_TOKEN)
const OAuth = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, MAIL_URL);


OAuth.setCredentials({ refresh_token: REFRESH_TOKEN })


const sendMail = async (v_code, userInfo) => {
    const accessToken = await OAuth.getAccessToken()
    try {
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                accessToken: accessToken,
                clientId: CLIENT_ID,
                clientSecret: CLIENT_SECRET,
                type: "OAUTH2",
                user: "psersianspacex@gmail.com"
            }
        })

        const mailResult = await transporter.sendMail({
            from: "APP Name",
            to: userInfo.email,
            subject: "Your refistration ...",
            text: "our text here",
            html: createMailContent(v_code, userInfo, FRONTEND_URL)
        })
        console.log(mailResult)
    } catch (error) {
        console.log(error)
    }
}

export default sendMail;