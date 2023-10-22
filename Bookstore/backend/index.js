import express from "express";
import { PORT, mongoURL } from "./config.js";
import mongoose from "mongoose";
import BookRoute from "./routes/bookRoute.js";
import cors from "cors";

const app = express();

// Middleware to parse the request body
app.use(express.json());

// Middleware to fix cors
// Option 1: Allow all origins with Default of cors(*)
app.use(cors());

// Option 2: Allow custom origin
// app.use(cors({
//     origin:'',
//     methods:['GET','POST','PUT','PATCH','DELETE'],
//     allowedHeaders:['Content-Type']
// }))

// Create a http route using http method : GET
app.get("/", (req, res) => {
  return res.status(202).send("Welcome to the server");
});

// Available Routes
app.use("/books", BookRoute);
// Connect to MongoDB database
mongoose
  .connect(mongoURL)
  .then(() => {
    console.log("Connected to MongoDB Atlas successfully");
    app.listen(PORT, () => {
      console.log(`App listening on http://localhost:${PORT}`);
    });
  })
  .catch((error) => console.log(error));
