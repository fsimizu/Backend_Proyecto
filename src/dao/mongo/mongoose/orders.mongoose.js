import { Schema, model } from "mongoose";

const orderSchema = new Schema({
    code: { type: Number, default: 0, required: true }, //cartId?? - este deberia ser un numero sequencial. como hacerlo?
    cart:{
      type: Schema.Types.ObjectId,
      ref: 'carts',
    },
    amount: { type: Number, required: true },
    purchaser: { type: String, required: true },
  }, {
    timestamps: {
      createdAt: 'purchase_datetime',
      updatedAt: 'updated_at'
    }
  });

export const OrdersMongooseModel = model("orders", orderSchema);