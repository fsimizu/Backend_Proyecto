import { Server } from 'socket.io';
import { chatService } from "../services/chat.service.js";
import { logger } from './logger.js';

export function connectSocketServer(httpServer) {
  const socketServer = new Server(httpServer);

  socketServer.on('connection', async socket => {
    
    logger.info("New client connected to the chat")
    try {
      const msgs = await chatService.findAllMessages();
      socketServer.emit("listado_de_msgs", msgs);
    } catch (e) {
      logger.error(e);
    }

    socket.on("msg_front_to_back", async (msg) => {
      try {
        await chatService.createMessage(msg);
      } catch (e) {
        logger.error(e);
      }
      
      try {
        const msgs = await chatService.findAllMessages();
        socketServer.emit("listado_de_msgs", msgs);
      } catch (e) {
        logger.error(e);
      }



    });
  })
}