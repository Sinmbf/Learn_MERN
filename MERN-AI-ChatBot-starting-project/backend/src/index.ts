import app from "./app.js";
import { connectToMongoDB } from "./database/connection.js";
const PORT = process.env.PORT || 5001;

// Connect to the database
connectToMongoDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`App listening on http://localhost:${PORT}`);
    });
  })
  .catch((error) => console.log(error));
