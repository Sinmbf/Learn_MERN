import { Schema, model } from "mongoose";

const ChatSchema = new Schema({
  role: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
});

const UserSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    chats: [ChatSchema],
    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default model("User", UserSchema);
