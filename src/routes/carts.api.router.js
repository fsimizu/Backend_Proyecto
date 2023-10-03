import express from "express";
import { cartsApiController } from "../controllers/carts.api.controller.js";
import { isOwnCart, isUser } from "../middlewares/auth.js";
export const cartsApiRouter = express.Router();

cartsApiRouter.post('/', cartsApiController.createOne);
cartsApiRouter.get('/:cid', isUser, isOwnCart, cartsApiController.getOne);
cartsApiRouter.put('/:cid', cartsApiController.updateCart);
cartsApiRouter.delete('/:cid', cartsApiController.clearAll);
cartsApiRouter.post('/:cid/product/:pid', isUser, isOwnCart, cartsApiController.postOne);
cartsApiRouter.put('/:cid/products/:pid', cartsApiController.updateQuantity);
cartsApiRouter.delete('/:cid/product/:pid', isUser, cartsApiController.clearOne);
cartsApiRouter.post('/:cid/purchase', isUser, cartsApiController.createOrder);