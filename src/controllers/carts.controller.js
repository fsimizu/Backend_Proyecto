import { cartService } from "../services/carts.service.js";

class CartsController {


  //ESTE SIRVE??
  // getId = async (req, res) => {
  //   try {
  //     const cartId = req.session.cid;
  //     const { products, totalItems, totalPrice } = await cartService.getCart({ cartId });
  //     return res.status(201).render('carts', { products, totalItems, totalPrice });
  //   } catch (error) {
  //     return res.status(500).render('error-products');
  //   }
  // }

  getOne = async (req, res) => {
    try {
      const cartId = req.session.user?.cart

      const { products, totalItems, totalPrice } = await cartService.getCart({ cartId });
      return res.status(201).render('carts', { products, totalItems, totalPrice, cartId });
    } catch (error) {
      return res.status(500).render('error-products');
    }
  }

  postOne = async (req, res) => {
    try {
      const { cid: cartId, pid: prodId } = req.params;
      const response = await cartService.updateCart(cartId, prodId);
      return res.status(200).json(response);
    } catch (error) {
      return res.status(500).render('error-products');
    }
  }

}



export const cartsController = new CartsController();