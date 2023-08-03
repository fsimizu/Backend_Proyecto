import express from "express";
import { chatController } from '../controllers/chat.controller.js';
import { isUser } from "../middlewares/auth.js";

export const chatRouter = express.Router();

chatRouter.get('/', isUser, chatController.get);