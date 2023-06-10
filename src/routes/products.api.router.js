import express from "express";
import ProductManager from "../dao/product-manager.js";
export const productsApiRouter = express.Router();

const productManager = new ProductManager("./src/dao/db/products.json");

productsApiRouter.get('/', async (req, res) => {
  await productManager.getProducts(req, res);
})

productsApiRouter.get('/:id', async (req, res) => {
  await productManager.getProductById(req, res);
})

productsApiRouter.post('/', async (req, res) => {
  await productManager.createProduct(req, res);
});

productsApiRouter.put('/:pid', async (req, res) => {
  await productManager.editProduct(req, res);
});

productsApiRouter.delete('/:pid', async (req, res) => {
  await productManager.deleteProduct(req, res);
});
