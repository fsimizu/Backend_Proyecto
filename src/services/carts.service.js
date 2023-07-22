import { cartModel } from "../dao/models/carts.model.js";

class CartService {
    async createCart() {
        return await cartModel.create({});
    };

    async getCart({cartId}) {
        return await cartModel.getCart({_id: cartId})
    };

    async upadateCart(cartId, products){
        try {
            return await upadateCart(cartId, products);
        } catch (error) {
            throw new Error ('Error updating the cart')
        }
    }

    async clearCart({cartId}){
        try {
            const searchedCart = await cartModel.getCart({_id: cartId});
            searchedCart.products = [];
            await searchedCart.save();
            return searchedCart;
        } catch (error) {
            throw new Error ('Cart not found')
        }
    }

    async upadateQuantity(cartId, prodId, quantity){
        try {
            const cart = await cartModel.findOne({_id: cartId});
            const prodIndex = cart.products.findIndex((obj) => obj.product._id.toString() === prodId)
            if (prodIndex === -1) {
                throw new Error('Product not found')
            }
            cart.products[prodIndex].quantity = quantity;
            await cart.save()
            return cart;
        } catch (error) {
            throw new Error ('Error updating the cart')
        }
    }

}

export const cartService = new CartService()