import { Schema, model } from "mongoose";

const cartSchema = new Schema({
    products: { type: Array }
    //ver como se debe definir este esquema
  });
  export const CartModel = model("carts", cartSchema);