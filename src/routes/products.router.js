import express from "express";
import { productsController } from '../controllers/products.controller.js';
import { canCreate, isUser } from "../middlewares/auth.js";
export const productsRouter = express.Router();

productsRouter.get('/', isUser, productsController.getAll);
productsRouter.post('/', canCreate, productsController.postOne);
productsRouter.get('/add', canCreate, productsController.addProduct);
productsRouter.get('/edit/:pid', canCreate, productsController.getOne);
productsRouter.post('/edit/:pid', canCreate, productsController.editOne);
productsRouter.get('/edit/:pid/photos', canCreate, productsController.addPhoto);