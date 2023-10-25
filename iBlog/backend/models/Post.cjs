const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const postModel = new Schema(
  {
    author: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
    title: {
      type: String,
      required: true,
    },
    summary: {
      type: String,
      required: true,
    },
    imagePath: {
      type: String,
    },
    content: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = model("post", postModel);
