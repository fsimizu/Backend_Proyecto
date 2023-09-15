import { Schema, model } from "mongoose";

const userSchema = new Schema({
  firstName: { type: String, required: true, max: 100 },
  lastName: { type: String, required: true, max: 100 },
  email: { type: String, required: true, max: 100, unique: true },
  age: { type: Number, required: false },
  password: { type: String, required: true, max: 100 },
  role: { type: String, required: false, max: 100, default: "user" },
  isAdmin: { type: Boolean, required: false, max: 100, default: false },
  cart: { type: String, required: false },
  documents: {
    type: [
      {
        name: { type: String, required: true, max: 100 },
        reference: { type: String, required: true, max: 100 }
      }
    ],
    default: [],
  },
  lastConnection: { type: Date, default: new Date() },
});


export const UserMongooseModel = model("users", userSchema);
