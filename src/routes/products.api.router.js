import express from "express";
import { productsApiController } from '../controllers/products.api.controller.js';
import { isAdmin } from "../middlewares/auth.js";
export const productsApiRouter = express.Router();

productsApiRouter.get('/', /*isAdmin,*/ productsApiController.getAll)
productsApiRouter.get('/:pid', isAdmin, productsApiController.getOne)
productsApiRouter.post('/', isAdmin, productsApiController.postOne);
productsApiRouter.delete('/:pid', isAdmin, productsApiController.deleteOne);
productsApiRouter.put('/:pid', isAdmin, productsApiController.editOne);