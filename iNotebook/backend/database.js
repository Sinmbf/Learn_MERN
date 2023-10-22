const mongoose = require("mongoose");
const mongoURI =
  "mongodb+srv://sinmbf:sinmbflost@lost.gmlqtoc.mongodb.net/?retryWrites=true&w=majority";
const connectToMongo = async () => {
  try {
    await mongoose.connect(mongoURI);
    console.log("Connected to Mongo Atlas successfully");
  } catch (error) {
    console.log(error);
  }
};

module.exports = connectToMongo;
