import express from "express";
import * as fs from 'fs';
import { v4 as uuidv4 } from "uuid";
import { readProductsFile,  } from "./products.router.js";
import { log } from "console";
export const cartsRouter = express.Router();

function readCartsFile() {
  return new Promise((resolve, reject) => {
    fs.readFile('./src/carts.json', 'utf8', (err, data) => {
      if (err) {
        reject(err);
      } else {
        const cartList = JSON.parse(data);
        resolve(cartList);
      }
    });
  });
}

cartsRouter.post('/', async (req, res) => {
    try {
      let cartList = await readCartsFile(); 
      
      const newCart = {
        id: uuidv4(),
        products: []
      };

      cartList.push(newCart);
      fs.writeFileSync("./src/carts.json", JSON.stringify(cartList, null, 4));

      return res.status(201).json({
        status: "Success",
        msg: "ok",
        cart: newCart});
  
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: 'Internal server error' });
      }
  });

  cartsRouter.get('/:cid', async (req, res) => {
    try {
      const cartId = req.params.cid;
      const cartList = await readCartsFile();
      const cartFound = cartList.find(c=>c.id === cartId);
    
      if (cartFound) {
        return res.status(201).json({
          status: "Success",
          msg: "The cart has been found",
          data: cartFound});
          }
      else {
        return res.status(404).json({
          status: "Error",
          msg: "The cart with the id provided does not exist",
          data: []});
    }
    } 
    catch (err) {
      console.error(err);
      return res.status(500).json({ error: 'Internal server error' });
    }
    });

    cartsRouter.post('/:cid/product/:pid', async (req, res) => {
        try {
          const cartId = req.params.cid;
          let cartList = await readCartsFile();
          const cartFound = cartList.find(c=>c.id === cartId);

          const prodId = req.params.pid;
          const prodList = await readProductsFile();
          const productFound = prodList.find(p=>p.id == prodId);
          
          if (!cartFound) {
              return res.status(404).json({
                  status: "Error",
                  msg: "The cart with the id provided does not exist",
                  data: []
              });
          }

          if (!productFound) {
              return res.status(404).json({
                  status: "Error",
                  msg: "The product with the id provided does not exist",
                  data: []
              });
          }
          
          let existing = false;

          cartFound.products.forEach((prod) => {            
            if (prod.prodId === prodId) { existing = true }
          })

          let prodIndex = cartFound.products.findIndex((prod)=>prod.prodId === prodId);
                    
          if (existing) {
              cartFound.products[prodIndex].quantity++;
          }
          else {
              cartFound.products.push({
                  prodId: prodId,
                  quantity: 1
              })
          }
          
          fs.writeFileSync("./src/carts.json", JSON.stringify(cartList, null, 4))

          return res.status(201).json({
            status: "Success",
            msg: "The product has been added to the cart",
            cartId: cartId,
            prodInCart: cartFound.products
          });
        }
        catch (err) {
          console.error(err);
          return res.status(500).json({ error: 'Internal server error' });
        }
        });