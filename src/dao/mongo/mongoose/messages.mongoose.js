import { Schema, model } from "mongoose";

const messageSchema = new Schema({
  user: { type: String, required: true, max: 100 },
  userId:{
    type: Schema.Types.ObjectId,
    ref: 'users',
  },
  message: { type: String, required: true, max: 100 }
});
export const MessageMongooseModel = model("messages", messageSchema);