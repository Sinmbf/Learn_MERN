import express from "express";
const app = express();
const port = 5000;

app.get("/", (req, res) => {
  res.send("Hello Sinmbf");
});

app.listen(port, () => {
  console.log(`App listening on http://localhost:${port}`);
});
