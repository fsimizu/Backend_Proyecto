import { MessageModel } from '../dao/factory.js';

const messageModel = new MessageModel();

class ChatService {

    async createMessage(msg) {
        return await messageModel.createMessage(msg);
    };

    async findAllMessages() {
        return await messageModel.findAllMessages();
    }



}

export const chatService = new ChatService()