import { Schema, model } from "mongoose";

const tokenSchema = new Schema({
  email: { type: String, required: true },
  token: { type: String, required: true },
  expiration: { type: Number, required: true },

});
export const TokensMongooseModel = model("tokens", tokenSchema);