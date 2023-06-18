import express from "express";
import { cartService } from "../services/carts.service.js";
import { productService } from "../services/products.service.js";
export const cartsApiRouter = express.Router();

cartsApiRouter.post('/', async (req, res) => {
  try {
    const cartCreated = await cartService.createCart({});
    return res.status(201).json({
      status: "success",
      msg: "cart created",
      payload: cartCreated
  });    
  } catch (error) {
    return res.status(500).json({
      status: "error",
      msg: "something went wrong :(" + error,
      payload: {},
    })
  }
  });

cartsApiRouter.get('/:cid', async (req, res) => {
  try {
    const cartId = req.params.cid;
    const searchedCart = await cartService.getCart({cartId});

    return res.status(200).json({
      status: "success",
      msg: "Cart found",
      payload: searchedCart
    });

  } catch (error) {
    return res.status(500).json({
      status: "error",
      msg: "something went wrong :(",
      payload: {},
    });
  }
});

cartsApiRouter.post('/:cid/product/:pid', async (req, res) => {
  try {
    const {cid: cartId, pid: prodId} = req.params;

    try {
      const searchedCart = await cartService.getCart({cartId});
      await productService.getProductById({prodId}); //sirve para saber si el id producto es correcto

      let existing = false;
  
      searchedCart.products.forEach((prod) => {            
        if (prod.product._id == prodId) { existing = true;}
      })

      let prodIndex = searchedCart.products.findIndex((prod)=>prod.product._id == prodId);
                
      if (existing) {
        //probar de hacer con UpdateOne en vez de esto
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

cartsApiRouter.delete('/:cid/product/:pid', async (req, res) => {
  try {
    const {cid: cartId, pid: prodId} = req.params;

    //todo esto lo puedo poner en el servicio
    try {
      const searchedCart = await cartService.getCart({cartId});
      await productService.getProductById({prodId}); //sirve para saber si existe el producto
      searchedCart.products = searchedCart.products.filter(obj => obj.product._id.toString() !== prodId);
      await searchedCart.save();

      return res.status(200).json({
      status: "success",
      msg: "Product removed from the cart",
      payload: {}
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

cartsApiRouter.delete('/:cid', async (req, res) => {
  try {
    const cartId = req.params.cid;
    await cartService.clearCart({cartId});
    return res.status(200).json({
    status: "success",
    msg: "The cart is now empty",
    payload: {}
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      msg: "something went wrong :(",
      payload: {},
    });
  }
});

cartsApiRouter.put('/:cid', async (req, res) => {
  try {
    const cartId = req.params.cid;
    const products = req.body;
    const cartModified = await cartService.upadateCart( cartId , products );
    //console.log(cartModified);
    return res.status(200).json({
      status: "success",
      msg: "Cart updated",
      payload: cartModified
    });

  } catch (error) {
    return res.status(500).json({
      status: "error",
      msg: "something went wrong :(",
      payload: {},
    });
  }
});

cartsApiRouter.put('/:cid/products/:pid', async (req, res) => {
  try {
    const {cid: cartId, pid: prodId } = req.params;
    const quantity = req.body.quantity;
    const cartModified = await cartService.upadateQuantity( cartId , prodId, quantity )

    return res.status(200).json({
      status: "success",
      msg: "Cart updated",
      payload: cartModified
    });

  } catch (error) {
    return res.status(500).json({
      status: "error",
      msg: "something went wrong :(",
      payload: {},
    });
  }
});