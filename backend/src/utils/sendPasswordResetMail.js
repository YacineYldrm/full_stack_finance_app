import { google } from "googleapis";
import nodemailer from "nodemailer";
import "dotenv/config";
import createMailContent from "./createMailContent.js";
import createResetPasswordMail from "./createResetPasswordMail.js";

const REFRESH_TOKEN = process.env.REFRESH_TOKEN;
const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const REDIRECT_URI = process.env.REDIRECT_URI;
const FRONTEND_URL = process.env.FRONTEND_URL;


const OAuth = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);

OAuth.setCredentials({ refresh_token: REFRESH_TOKEN });

const sendPasswordResetMail = async (token, userInfo) => {
    const accessToken = await OAuth.getAccessToken();
    try {
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                type: "OAUTH2",
                accessToken: accessToken,
                clientId: CLIENT_ID,
                clientSecret: CLIENT_SECRET,
                refreshToken: REFRESH_TOKEN,
                user: "persianspacex@gmail.com",
            },
        });

        const mailResult = await transporter.sendMail({
            from: "FINOCCIO App <psersianspacex@gmail.com >",
            to: userInfo.email,
            subject: "Link to reset Password!",
            html: createResetPasswordMail(token, userInfo, FRONTEND_URL),
            attachments: [{
                filename: "Logo.svg",
                path: "./Logo.svg",
                cid: "persianspacex@gmail.com"
            }]
        });

    } catch (error) {
        console.log(error);
    }
};

export default sendPasswordResetMail;
