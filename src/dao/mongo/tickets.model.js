import { TicketsMongooseModel } from "./mongoose/tickets.mongoose.js";

export default class TicketModel {

  async createOrder({ code, cartId, amount, purchaser }) {
    return await TicketsMongooseModel.create({ code, cartId, amount, purchaser });
  };

  async getLastOrder() {
    const lastOrder = await TicketsMongooseModel.findOne({}).sort('-code');
    return lastOrder?.code
  }
}