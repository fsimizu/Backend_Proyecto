import express from "express";
import { cartsController } from '../controllers/carts.controller.js';
import { isUser, isOwnCart } from "../middlewares/auth.js";
export const cartsRouter = express.Router();

cartsRouter.get('/:cid', isUser, isOwnCart, cartsController.getOne);
cartsRouter.post('/:cid/product/:pid', isUser, isOwnCart, cartsController.postOne);
// cartsRouter.post('/:cid/purchase', /*isUser,*/ cartsController.createOrder);