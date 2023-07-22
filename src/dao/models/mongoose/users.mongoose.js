import { Schema, model } from "mongoose";

const userSchema = new Schema({
  firstName: { type: String, required: true, max: 100 },
  lastName: { type: String, required: true, max: 100 },
  email: { type: String, required: true, max: 100 , unique : true},
  age: { type: Number, required: false },
  password: { type: String, required: true, max: 100 },
  role: { type: String, required: true, max: 100, default: "user" },
  isAdmin: { type: Boolean, required: true, max: 100, default: false },
  cart: { type: String, required: false },
});
export const UserMongooseModel = model("users", userSchema);
