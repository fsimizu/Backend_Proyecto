import { Schema, model } from "mongoose";

const orderSchema = new Schema({
    code: { type: String, required: true }, //cartId??
    amount: { type: Number, required: true },
    purchaser: { type: String, required: true },
  }, {
    timestamps: {
      createdAt: 'purchase_datetime',
      updatedAt: 'updated_at'
    }
  });

export const OrdersMongooseModel = model("orders", orderSchema);