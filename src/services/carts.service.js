// import { CartModel } from "../dao/mongo/carts.model.js";
import { CartModel } from '../dao/factory.js';
import { ProductModel } from '../dao/factory.js';

const cartModel = new CartModel()
const productModel = new ProductModel()

class CartService {
    async createCart() {
        return await cartModel.createCart({});
    };

    async getCart({cartId}) {
        const searchedCart = await cartModel.getCart({_id: cartId});

        const products = searchedCart.products;

        let totalItems = 0;
        let totalPrice = 0;
        let prodInStock = 0;
        products.forEach(obj => {
            totalItems += obj.quantity;
            totalPrice += obj.product.price * obj.quantity
            obj.subtotal = obj.product.price * obj.quantity
            if (obj.product.stock > 0) {
                prodInStock ++
            }
        })

        return {products, totalItems, totalPrice, prodInStock};
    };

    async updateCart(cartId, prodId) {
        try {
            const searchedCart = await cartModel.getCart({_id: cartId});

            let existing = false;
            searchedCart.products.forEach((prod) => {
                if (prod.product._id == prodId) { existing = true; }
            });
            let prodIndex = searchedCart.products.findIndex((prod) => prod.product._id == prodId);
            
            if (existing) {
                searchedCart.products[prodIndex].quantity++;
            } else {
                searchedCart.products.push({
                    product: prodId,
                    quantity: 1
                })
            }
            await searchedCart.save();

            return {
                status: "success",
                msg: "Cart found",
                payload: searchedCart
            };

        } catch (error) {
            return {
                status: "error",
                msg: "Cart or product not found",
                payload: {}
            }
            }; 

    }

    async clearOne(cartId, prodId) {
        try {
            // const searchedCart = await cartModel.getCart({_id: cartId});
            // await productModel.getProductById({ _id: prodId }) //sirve para saber si existe el producto
            //forma mas rapida de hacerlo (2X)
            const [searchedCart, searchedProduct] = await Promise.all([cartModel.getCart({_id: cartId}), productModel.getProductById({ _id: prodId })])

            searchedCart.products = searchedCart.products.filter(obj => obj.product._id.toString() !== prodId);
            await searchedCart.save();

            return {
                status: "Success",
                msg: "Product removed from the cart",
                payload: {}
            };

        } catch (error) {
            return {
                status: "error",
                msg: "Cart or product not found",
                payload: {}
            }
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

    async updateQuantity(cartId, prodId, quantity){
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

    async createOrder( {cartId} ){
        try {
            const cart = await cartModel.findOne({_id: cartId});
            await cart.save()
            return cart;
        } catch (error) {
            throw new Error ('Error updating the cart')
        }
    }


}

export const cartService = new CartService()