import express from "express";
import { cartsApiController } from "../controllers/carts.api.controller.js";
import { isUser, isOwnCart } from "../middlewares/auth.js";
export const cartsApiRouter = express.Router();

cartsApiRouter.post('/', cartsApiController.createOne);
cartsApiRouter.get('/:cid', isUser, isOwnCart, cartsApiController.getOne);
cartsApiRouter.post('/:cid/product/:pid', isUser, isOwnCart, cartsApiController.postOne);
cartsApiRouter.delete('/:cid/product/:pid', isUser, cartsApiController.clearOne);
cartsApiRouter.delete('/:cid', cartsApiController.clearAll);
cartsApiRouter.put('/:cid', cartsApiController.updateCart);
cartsApiRouter.put('/:cid/products/:pid', cartsApiController.updateQuantity);
cartsApiRouter.post('/:cid/purchase', isUser, cartsApiController.createOrder);