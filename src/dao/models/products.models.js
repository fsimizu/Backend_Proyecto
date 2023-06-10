import { Schema, model } from "mongoose";

const productSchema = new Schema({
    title: { type: String, required: true, max: 100 },
    description: { type: String, required: true, max: 100 },
    price: { type: Number, required: true, max: 10 },
    thumbnail: { type: String, required: true, max: 100 },
    code: { type: String, required: true, max: 100 },
    stock: { type: Number, required: true, max: 10 },
    status: { type: Boolean, required: true, max: 10 },
  });
  export const ProductModel = model("products", productSchema);