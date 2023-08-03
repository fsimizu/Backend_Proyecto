import { OrdersMongooseModel } from "./mongoose/orders.mongoose.js";

export default class OrderModel {

  async createOrder({ cartId: code, amount, purchaser }) {

    // console.log(code, amount, purchaser);
    return await OrdersMongooseModel.create({ code, amount, purchaser });
  };


}