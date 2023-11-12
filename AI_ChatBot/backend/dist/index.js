import app from "./app.js";
import { connectToMongoDB } from "./database/connection.js";
app.get("/", (req, res) => {
    res.send("Hello");
});
const PORT = process.env.PORT || 5001;
// Connect to Mongo DB database
connectToMongoDB()
    .then(() => {
    app.listen(PORT, () => {
        console.log(`App listening on http://localhost:${PORT}`);
    });
})
    .catch((error) => console.log(error));
//# sourceMappingURL=index.js.map