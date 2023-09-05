import { cartService } from "../services/carts.service.js";
import { logger } from "../utils/logger.js";

class CartsController {

  getOne = async (req, res) => {
    try {
      const cartId = req.session.user?.cart
      const { products, totalItems, totalPrice, prodInStock } = await cartService.getCart({ cartId });
      return res.status(201).render('carts', { products, totalItems, totalPrice, cartId, prodInStock });
    } catch (error) {
      logger.error('Error calling the cartService. ' + error)
      return res.status(500).render('error', {code: 500, msg: "Error retrieving the cart"}); 
    }
  }

  postOne = async (req, res) => {
    try {
      const { cid: cartId, pid: prodId } = req.params;
      const response = await cartService.updateCart(cartId, prodId);
      return res.status(200).json(response);
    } catch (error) {
      return res.status(500).render('error', {code: 500, msg: "Error posting the cart"});
    }
  }

}



export const cartsController = new CartsController();