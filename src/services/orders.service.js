import { CartModel } from '../dao/factory.js';
import { OrderModel } from '../dao/factory.js';
import { UserModel } from '../dao/factory.js';

const orderModel = new OrderModel();
const cartModel = new CartModel();
const userModel = new UserModel();

class OrderService {
    
    async createOrder({ cartId, purchaser }) {

        const searchedCart = await cartModel.getCart({ _id: cartId });

        let amount = 0;
        let prodPending = [];
        let prodPurchased = [];
        let outOfStock = false;
        
        searchedCart.products.forEach((obj) => {
            if (obj.product.stock >= obj.quantity) {
                prodPurchased.push(obj)
                amount += obj.quantity * obj.product.price
            }
            else {
                prodPending.push(obj);
                outOfStock = true;
            }
        });
               
        //Deja el carrito solo con los productos en stock
        await cartModel.updateCart({ _id: cartId }, { products: prodPurchased });

        //find max code and add 1
        const lastOrder = await orderModel.getLastOrder() || 5359638;
        const newOrder = lastOrder + 1;
        //Crea la orden
        const orderCreated = await orderModel.createOrder({ code: newOrder, cartId, amount, purchaser: purchaser.email });

        //Crear un nuevo carrito
        const newCart = await cartModel.createCart();

        //Pone en el carrito nuevo los productos sin stock
        await cartModel.updateCart({ _id: newCart._id }, { products: prodPending });

        //Asigna el nuevo carrito al usuario
        await userModel.assignCart({ _id: purchaser?._id }, { cart: newCart._id });

        return { orderCreated, newCart, outOfStock };
    };


}

export const orderService = new OrderService()