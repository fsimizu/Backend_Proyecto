import { Server } from 'socket.io';
import { chatService } from "../services/chat.service.js";

export function connectSocketServer(httpServer) {
  const socketServer = new Server(httpServer);

  socketServer.on('connection', async socket => {
    
    console.log("Nuevo cliente conectado");
    try {
      const msgs = await chatService.findAllMessages();
      socketServer.emit("listado_de_msgs", msgs);
    } catch (e) {
      console.log(e);
    }

    socket.on("msg_front_to_back", async (msg) => {
      try {
        await chatService.createMessage(msg);

      } catch (e) {
        console.log(e);
      }
      
      try {
        const msgs = await chatService.findAllMessages();
        socketServer.emit("listado_de_msgs", msgs);
      } catch (e) {
        console.log(e);
      }



    });
  })
}