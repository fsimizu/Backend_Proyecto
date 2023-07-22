import { CartsMongooseModel } from "./mongoose/carts.mongoose.js";

class CartModel {

  createCart() {
    return CartsMongooseModel.create({});
  };

  getCart(cartId ) {
    return CartsMongooseModel.findOne({ _id: cartId })
  };

  upadateCart(cartId, products) {
    return CartsMongooseModel.findByIdAndUpdate(cartId, products, { new: true });
  }

}

export const cartModel = new CartModel();