import express from "express";
import { productsController } from '../controllers/products.controller.js';
import { isUser } from "../middlewares/auth.js";
export const productsRouter = express.Router();

productsRouter.get('/', isUser, productsController.getAll);
