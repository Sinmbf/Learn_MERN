import { connect } from "mongoose";
export const connectToMongoDB = async () => {
    try {
        await connect(process.env.MONGO_URL);
        console.log("Connected to Mongo DB Atlas successfully");
    }
    catch (error) {
        console.log(error);
    }
};
//# sourceMappingURL=connection.js.map