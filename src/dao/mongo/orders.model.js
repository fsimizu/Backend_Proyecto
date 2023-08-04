import { OrdersMongooseModel } from "./mongoose/orders.mongoose.js";

export default class OrderModel {

  async createOrder({ code, cartId, amount, purchaser }) {
    return await OrdersMongooseModel.create({ code, cartId, amount, purchaser });
  };

  async getLastOrder() {
    const lastOrder = await OrdersMongooseModel.findOne({}).sort('-code');
    return lastOrder?.code
  }


}