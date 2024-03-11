import express from "express";
import cors from "cors";
import morgan from "morgan";
import "dotenv/config";
import multer from "multer";
import mongoose from "mongoose";
import status from "./utils/status.js";
import routerOne from "./routers/routerOne.js";
import cookieSession from "cookie-session";


const app = express();

// ###################################

app.use(morgan("dev"));
app.use(cors());

// ###################################

app.use(express.static("./data"));

// ###################################

const storage = multer.diskStorage({
    destination: "./data",
    filename: (_, file, cb) => {
        cb(null, Date.now() + file.originalname);
    }
})

const upload = multer({ storage: storage });

app.use(upload.single("image"));

// ###################################

const COOKIE_SECRET = process.env.COOKIE_SECRET;
const tenDays = 10 * 24 * 60 * 60 * 1000;

app.use(cookieSession({
    name: "session",
    httpOnly: true,
    secret: COOKIE_SECRET,
    secure: true,
    signed: true,
    maxAge: tenDays
}))

// ###################################


app.use('/api/v1/model1', routerOne);










// ###################################

app.get((_, res) => {
    res.status(status.NOT_FOUND).json({ success: false, result: "Not Found" });
});


// ###################################

const PORT = process.env.PORT || 3001
const startServer = () => {
    console.log("starting Server...");
    app.listen(PORT, console.log("SERVER LISTENING @ PORT: " + PORT));
}

const URI = process.env.MONGODB_URI
const connectDB = async () => {
    console.log("Connecting to DB...");
    await mongoose.connect(URI, { dbName: "FULLSTACK_ABSCHLUSS_PROJECT" });
    console.log("DB Connection successful");
}

connectDB()
    .then(startServer)
    .catch(err => console.log(err));