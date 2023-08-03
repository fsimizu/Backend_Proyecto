import { MessageMongooseModel } from "./mongoose/messages.mongoose.js";

class MessageModel {
  
  creteMessage(msg) {
    return MessageMongooseModel.create(msg);
  };

  findAllMessages() {
    return MessageMongooseModel.find({})
  }
  
}

export const messageModel = new MessageModel();