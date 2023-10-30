import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import multer from "multer";
import helmet from "helmet";
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from "url"; // To properly set the path when configuring directories
import { register } from "./controllers/auth.js";
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/user.js";

/* CONFIGURATIONS (Middlewares) --> Functions that run in between various requests*/

const __filename = fileURLToPath(import.meta.url); // Decode the file url
const __dirname = path.dirname(__filename); // Get the directory from a file path
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
app.use("/assets", express.static(path.join(__dirname, "public/assets")));

/* FILE STORAGE */
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/assets");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage });

/* MONGOOSE SETUP*/
const PORT = process.env.PORT || 6001;
const mongoURL = process.env.MONGO_URL;

mongoose
  .connect(mongoURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() =>
    app.listen(PORT, () => {
      console.log(`App listening on http://localhost:${PORT}`);
    })
  )
  .catch((error) => console.log(error));

//AUTH ROUTE 1: Register the user using POST : /auth/register
app.post("/auth/register", upload.single("image"), register); // We need upload so this is written here

// Other Routes
app.use("/auth", authRoutes);
app.use("/users", userRoutes);
