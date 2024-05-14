const { Schema, model } = require("mongoose");

const collection = "messages";

const messageSchema = new Schema({
  sender: {
    type: Schema.Types.ObjectId,
    ref: "Users",
    required: true,
  },
  recipient: {
    type: Schema.Types.ObjectId,
    ref: "Users",
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
  isRead: {
    type: Boolean,
    default: false,
  },
  isDeleted: {
    type: Boolean,
    default: false,
  }
});

export const messageModel = model(collection, messageSchema);
