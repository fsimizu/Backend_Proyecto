import express from "express";
import { productsApiController } from '../controllers/products.api.controller.js';
import { isAdmin, canCreate } from "../middlewares/auth.js";
export const productsApiRouter = express.Router();

productsApiRouter.get('/', /*isAdmin,*/ productsApiController.getAll)
productsApiRouter.get('/:pid', isAdmin, productsApiController.getOne)
productsApiRouter.post('/', /*canCreate,*/ productsApiController.postOne);
productsApiRouter.delete('/:pid', canCreate, productsApiController.deleteOne);
productsApiRouter.put('/:pid', isAdmin, productsApiController.editOne);