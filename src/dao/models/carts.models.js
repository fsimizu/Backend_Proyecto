import { Schema, model } from "mongoose";

const cartSchema = new Schema({
  products: {
    type: [
      {
        product:{
          type: Schema.Types.ObjectId,
          ref: 'products',
        },
        quantity: { 
          type: Number, 
          required: true,
          min: 0,
          max: 100 }
      }
    ],
    default: [],
  }
});

cartSchema.pre('find', function() {
  this.populate('products.product')
})
cartSchema.pre('findOne', function() {
  this.populate('products.product')
})

export const CartModel = model("carts", cartSchema);