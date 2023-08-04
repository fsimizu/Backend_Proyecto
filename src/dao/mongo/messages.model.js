import { MessageMongooseModel } from "./mongoose/messages.mongoose.js";

export default class MessageModel {
  
  createMessage(msg) {
    return MessageMongooseModel.create(msg);
  };

  findAllMessages() {
    return MessageMongooseModel.find({})
  }
  
}
