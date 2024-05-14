import { Schema, model } from "mongoose";

const collection = "products";

const productSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  thumbnails: {
    type: String,
    required: true,
  },
  code: {
    type: String,
    unique: true,
    required: true,
  },
  stock: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  owner: {
    type: String,
    default: "admin",
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
});

export const productModel = model(collection, productSchema);