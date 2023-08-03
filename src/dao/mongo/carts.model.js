import { CartsMongooseModel } from "./mongoose/carts.mongoose.js";

export default class CartModel {

  createCart() {
    return CartsMongooseModel.create({});
  };

  getCart(cartId ) {
    return CartsMongooseModel.findOne({ _id: cartId })
  };

  updateCart(cartId, products) {
    return CartsMongooseModel.findByIdAndUpdate(cartId, products, { new: true });
  }

}

// export const cartModel = new CartModel();