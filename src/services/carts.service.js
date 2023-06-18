import { CartModel } from "../dao/models/carts.models.js";

class CartService {
    async createCart() {
        return await CartModel.create({});
    };

    async getCart({cartId}) {
        return await CartModel.findOne({_id: cartId})
    };

    async upadateCart(cartId, products){
        try {
            const cartModified = await CartModel.findByIdAndUpdate(cartId, products, {new: true});
            return cartModified;
        } catch (error) {
            throw new Error ('Error updating the cart')
        }
    }

    async clearCart({cartId}){
        try {
            const searchedCart = await cartService.getCart({cartId});
            searchedCart.products = [];
            await searchedCart.save();
            return searchedCart;
        } catch (error) {
            throw new Error ('Cart not found')
        }
    }

    async upadateQuantity(cartId, prodId, quantity){
        try {
            const cart = await CartModel.findOne({_id: cartId});
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