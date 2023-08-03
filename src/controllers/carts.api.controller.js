import { cartService } from "../services/carts.service.js";
import { orderService } from "../services/orders.service.js";

class CartsApiController {

    createOne = async (_, res) => {
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
    }

    getOne = async (req, res) => {
        try {
            const cartId = req.params.cid;
            const searchedCart = await cartService.getCart({ cartId });

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
    }

    postOne = async (req, res) => {
        try {
            const { cid: cartId, pid: prodId } = req.params;
            const response = await cartService.updateCart(cartId, prodId);
            return res.status(200).json(response);

        } catch (error) {
            return res.status(500).json({
                status: "error",
                msg: "something went wrong :(",
                payload: {},
            });
        }
    }

    clearOne = async (req, res) => {
        try {
            const { cid: cartId, pid: prodId } = req.params;
            const response = await cartService.clearOne(cartId, prodId);
            return res.status(200).json(response);
        } catch (error) {
            return res.status(500).json({
                status: "error",
                msg: "something went wrong :(",
                payload: {},
            });
        }
    }

    clearAll = async (req, res) => {
        try {
            const cartId = req.params.cid;
            await cartService.clearCart({ cartId });
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
    }

    updateCart = async (req, res) => {
        try {
            const cartId = req.params.cid;
            const products = req.body;
            const cartModified = await cartService.updateCart(cartId, products);

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
    }

    updateQuantity = async (req, res) => {
        try {
            const { cid: cartId, pid: prodId } = req.params;
            const quantity = req.body.quantity;
            const cartModified = await cartService.updateQuantity(cartId, prodId, quantity)

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
    }

    createOrder = async (req, res) => {
        try {
            const { cid: cartId } = req.params;
            const purchaser = req.session.user
            const { orderCreated, newCart, outOfStock } = await orderService.createOrder({ cartId, purchaser });
            req.session.user.cart = newCart._id.toString();

            return res.status(200).json({
                status: "success",
                msg: "Order completed",
                productsOutOfStock: outOfStock,
                payload: orderCreated
            });

        } catch (error) {
            return res.status(500).json({
                status: "error",
                msg: "something went wrong :(",
                payload: {},
            });
        }
    }

}

export const cartsApiController = new CartsApiController();