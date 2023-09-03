import { Schema, model } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const schema = new Schema({
  title: { type: String, required: true, max: 100 },
  description: { type: String, required: true },
  category: { type: String, required: true },
  code: { type: String, required: true },
  price: { type: Number, required: true },
  stock: { type: Number, required: true },
  thumbnail: { type: String, required: true },
  owner: { type: String , default: "admin" },
});

schema.plugin(mongoosePaginate);

export const ProductsMongooseModel = model("products", schema);
