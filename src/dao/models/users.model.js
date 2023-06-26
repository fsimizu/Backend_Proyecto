import { Schema, model } from "mongoose";

const userSchema = new Schema({
  firstName: { type: String, required: true, max: 100 },
  lastName: { type: String, required: true, max: 100 },
  email: { type: String, required: true, max: 100 , unique : true},
  pass: { type: String, required: true, max: 100 },
  role: { type: String, required: true, max: 100, default: "user" },
});
export const UserModel = model("users", userSchema);
