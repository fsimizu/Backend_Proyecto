import { Server } from 'socket.io';
import { MessageModel } from '../dao/models/messages.model.js';

export function connectSocketServer(httpServer) {
    const socketServer = new Server(httpServer);
    
    socketServer.on('connection', socket => {
      console.log("Nuevo cliente conectado");
    
      socket.on("msg_front_to_back", async(msg) => {
        try {
          await MessageModel.create(msg);
        } catch (e) {
          console.log(e);
        }
        
        try {
          const msgs = await MessageModel.find({})
          socketServer.emit("listado_de_msgs", msgs);

        } catch (e) {
          console.log(e);
        }
        
      });
    })
    }