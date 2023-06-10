import * as fs from 'fs';
import { v4 as uuidv4 } from "uuid";
import { readCartsFile, readProductsFile } from "../functions/functions.js";

class CartManager {
    constructor(path) {
        this.path = path
        const productsString = fs.readFileSync(this.path,"utf-8"); 
        this.products = JSON.parse(productsString);
    }

    async createCart(req,res){
        try {
            let cartList = await readCartsFile(); 
            const newCart = {
              id: uuidv4(),
              products: []
            };
      
            cartList.push(newCart);
            fs.writeFileSync("./src/dao/db/carts.json", JSON.stringify(cartList, null, 4));
      
            return res.status(201).json({
              status: "Success",
              msg: "ok",
              cart: newCart});
        
          } catch (err) {
              console.error(err);
              return res.status(500).json({ error: 'Internal server error' });
            }
    };

    async getCart(req,res) {
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
    };

    async addProductToCart(req, res) {
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
        
        fs.writeFileSync("./src/dao/db/carts.json", JSON.stringify(cartList, null, 4))
    
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
    }
}

export default CartManager