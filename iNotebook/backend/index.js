const express = require("express");
const connectToMongo = require("./database");
connectToMongo();
const app = express();
const port = 5000;
const cors = require("cors");

// To fix the cors issue
app.use(
  cors({
    origin: "https://inotebook-frontend-ejsg.onrender.com",
    credentials: true,
  })
);
// Set middleware of CORS
// app.use((req, res, next) => {
//   res.setHeader("Access-Control-Allow-Origin", "http://localhost:5173");
//   res.setHeader(
//     "Access-Control-Allow-Methods",
//     "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS,CONNECT,TRACE"
//   );
//   res.setHeader(
//     "Access-Control-Allow-Headers",
//     "Content-Type, Authorization, X-Content-Type-Options, Accept, X-Requested-With, Origin, Access-Control-Request-Method, Access-Control-Request-Headers, auth-token"
//   );
//   res.setHeader("Access-Control-Allow-Credentials", true);
//   res.setHeader("Access-Control-Allow-Private-Network", true);
//   //  Firefox caps this at 24 hours (86400 seconds). Chromium (starting in v76) caps at 2 hours (7200 seconds). The default value is 5 seconds.
//   res.setHeader("Access-Control-Max-Age", 7200);

//   next();
// });

// To parse the request body
app.use(express.json());

// Available Routes
app.use("/api/note", require("./routes/note"));
app.listen(port, () => {
  console.log(`App listening on http://localhost:${port}`);
});
