import express from "express";
import { cartService } from "../services/carts.service.js";
import { isUser, isAdmin } from "../../middlewares/auth.js";
export const cartsRouter = express.Router();

cartsRouter.get('/:cid', isUser, async (req, res) => {
    try {
      const cartId = req.params.cid;
      const searchedCart = await cartService.getCart({cartId});
      const products =  searchedCart.products;
      let totalItems = 0;
      let totalPrice = 0;
      products.forEach( obj => {
        totalItems += obj.quantity;
        totalPrice += obj.product.price*obj.quantity
        obj.subtotal = obj.product.price*obj.quantity
        })
      
      return res.status(201).render('carts', {products, totalItems, totalPrice});
  
    } catch (error) {
        return res.status(500).render('error-products');
      }
  });

cartsRouter.post('/:cid/product/:pid', async (req, res) => {
try {
    const {cid: cartId, pid: prodId } = req.params;
    try {
        const searchedCart = await cartService.getCart({cartId});
        let existing = false;
        searchedCart.products.forEach((prod) => {            
            if (prod.product._id == prodId) { existing = true;}
        })
        let prodIndex = searchedCart.products.findIndex((prod)=>prod.product._id == prodId);
                       
        if (existing) {
            searchedCart.products[prodIndex].quantity++;
        } else {
            searchedCart.products.push({
            product: prodId,
            quantity: 1
            })
        }
        await searchedCart.save();

    return res.status(200).json({
    status: "success",
    msg: "Cart found",
    payload: searchedCart
    });

    } catch (error) {
    return res.status(404).json({
        status: "error",
        msg: "Cart or product not found",
        payload: {}
    });
    }

} catch (error) {
    return res.status(500).json({
    status: "error",
    msg: "something went wrong :(",
    payload: {},
    });
}
  });
  