import { Schema, model } from "mongoose";

const userCollection = "users";

const userSchema = new Schema({
  first_name: {
    type: String,
    required: true,
  },
  last_name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
  last_connection: {
    type: Date,
  },
  online: {
    type: Boolean,
    default: false,
  },
  cart: {
    type: Schema.Types.ObjectId,
    ref: "carts",
  },
  conversations: [
    {
      withUser: {
        type: Schema.Types.ObjectId,
        ref: "Users",
      },
      lastMessageAt: { type: Date, default: Date.now },
    },
  ],
});

export const userModel = model(userCollection, userSchema);
