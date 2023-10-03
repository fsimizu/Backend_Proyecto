import { cartService } from "../services/carts.service.js";
import CustomError from "../services/errors/custom-error.js";
import Errors from "../services/errors/enums.js";
import { logger } from "../utils/logger.js";

class CartsController {

  getOne = async (req, res) => {
    try {
      const cartId = req.session.user?.cart
      const { products, totalItems, totalPrice, prodInStock } = await cartService.getCart({ cartId });
      return res.status(201).render('carts', { products, totalItems, totalPrice, cartId, prodInStock });
    } catch (error) {
      logger.error('Cart controller error. ' + error)
      CustomError.createError({
        name: "Unexpected error",
        cause: error,
        message: "Carts controller error in the getOne function.",
        code: Errors.UNEXPECTED_ERROR,
      });
    }
  }

  postOne = async (req, res) => {
    try {
      const { cid: cartId, pid: prodId } = req.params;
      const response = await cartService.updateCart(cartId, prodId);
      return res.status(200).json(response);
    } catch (error) {
      logger.error('Cart controller error. ' + error)      
      CustomError.createError({
        name: "Unexpected error",
        cause: error,
        message: "Carts controller error in the postOne function.",
        code: Errors.UNEXPECTED_ERROR,
      });
    }
  }
}

export const cartsController = new CartsController();