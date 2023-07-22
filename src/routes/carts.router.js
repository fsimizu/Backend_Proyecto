import express from "express";
import { cartsController } from '../controllers/carts.controller.js';
import { isUser } from "../middlewares/auth.js";
export const cartsRouter = express.Router();

cartsRouter.get('/:cid', isUser, cartsController.getOne);
cartsRouter.post('/:cid/product/:pid', isUser, cartsController.postOne);
  