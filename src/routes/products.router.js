import express from "express";
import ProductManager from "../dao/product-manager.js";
export const productsRouter = express.Router();
import { readProductsFile } from "../functions/functions.js";

const productManager = new ProductManager("./src/dao/db/products.json");

productsRouter.get('/', async (req, res) => {
  let prodList = await readProductsFile();

  return res.status(201).render('products', { prodList });

})

