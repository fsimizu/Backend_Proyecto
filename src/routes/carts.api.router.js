import express from "express";
import CartManager from "../dao/cart-manager.js";
export const cartsApiRouter = express.Router();

const cartManager = new CartManager("./src/dao/db/carts.json");

cartsApiRouter.post('/', async (req, res) => {
  await cartManager.createCart(req, res);
  });
  
cartsApiRouter.get('/:cid', async (req, res) => {
  await cartManager.getCart(req, res);
});

cartsApiRouter.post('/:cid/product/:pid', async (req, res) => {
  await cartManager.addProductToCart(req,res) ;
});