import { connect, disconnect } from "mongoose";
const connectToMongoDB = async () => {
    try {
        await connect(process.env.MONGODB_URL);
        console.log("Connected to Mongo DB Atlas successfully");
    }
    catch (error) {
        console.log(error);
        throw new Error("Cannot connect to the database");
    }
};
const disconnectFromDatabase = async () => {
    try {
        await disconnect();
    }
    catch (error) {
        console.log(error);
        throw new Error("Cannot connect to the database");
    }
};
export { connectToMongoDB, disconnectFromDatabase };
//# sourceMappingURL=connection.js.map