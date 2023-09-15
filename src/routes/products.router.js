import express from "express";
import { productsController } from '../controllers/products.controller.js';
import { isUser, canCreate } from "../middlewares/auth.js";
export const productsRouter = express.Router();

productsRouter.get('/', isUser, productsController.getAll);
productsRouter.get('/add', canCreate, productsController.addProduct);
productsRouter.get('/edit/:pid', canCreate, productsController.getOne);
productsRouter.post('/edit/:pid', canCreate, productsController.editOne);
productsRouter.post('/', /*canCreate,*/ productsController.postOne);