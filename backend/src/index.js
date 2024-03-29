import express from "express";
import cors from "cors";
import morgan from "morgan";
import "dotenv/config";
import multer from "multer";
import mongoose from "mongoose";
import status from "./utils/status.js";
import cookieSession from "cookie-session";
import userRouter from "./routers/userRouter.js";
import accountRouter from "./routers/accountRouter.js";

const app = express();

// ###################################
app.use(express.json());
app.use(morgan("dev"));
app.use(
    cors({
        origin: process.env.FRONTEND_URL,
        credentials: true,
    })
);

// ###################################

app.use(express.static("./data"));

// ###################################

const storage = multer.diskStorage({
    destination: "./data",
    filename: (_, file, cb) => {
        cb(null, Date.now() + file.originalname);
    },
});

const upload = multer({ storage: storage });

app.use(upload.single("image"));

// ###################################

const COOKIE_SECRET = process.env.COOKIE_SECRET;
const tenDays = 10 * 24 * 60 * 60 * 1000;

app.use(
    cookieSession({
        name: "session",
        httpOnly: true,
        secret: COOKIE_SECRET,
        secure: false,
        signed: true,
        maxAge: tenDays,
    })
);

// ###################################

app.use("/api/v1/users", userRouter);
app.use("/api/v1/accounts", accountRouter);

// ###################################

app.get((_, res) => {
    res.status(status.NOT_FOUND).json({ success: false, result: "Not Found" });
});

// ###################################

const PORT = process.env.PORT || 3001;
const startServer = () => {
    console.log("starting Server...");
    app.listen(PORT, console.log("SERVER LISTENING @ PORT: " + PORT));
};

const URI = process.env.MONGODB_URI;
const connectDB = async () => {
    console.log("Connecting to DB...");
    await mongoose.connect(URI, { dbName: "FINCO" });
    console.log("DB Connection successful");
};

connectDB()
    .then(startServer)
    .catch((err) => console.log(err));
