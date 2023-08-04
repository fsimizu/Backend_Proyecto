import config from '../config/environment.config.js';
// import { connectMongo } from '../utils/dbConnection.js';
import MongoSingleton from '../utils/mongoSingleton.js';

export let ProductModel;
export let CartModel;
export let OrderModel;
export let UserModel;
export let MessageModel;

console.log(config.persistence);

switch (config.persistence) {
  case 'MONGO':
    console.log('Persistence with Mongo');
    
    MongoSingleton.getInstance()
    // connectMongo();

    const { default: ProductsMongo } = await import('./mongo/products.model.js');
    ProductModel = ProductsMongo;
    const { default: CartsMongo } = await import('./mongo/carts.model.js');
    CartModel = CartsMongo;
    const { default: OrdersMongo } = await import('./mongo/orders.model.js');
    OrderModel = OrdersMongo;
    const { default: UsersMongo } = await import('./mongo/users.model.js');
    UserModel = UsersMongo;
    const { default: MessageMongo } = await import('./mongo/messages.model.js');
    MessageModel = MessageMongo;


    break;
    
  case 'MEMORY':
    console.log('Persistence with Memory');
    // const { default: ContactsMemory } = await import('./memory/contacts.memory.js');
    // Contacts = ContactsMemory;

    break;
  default:
    break;
}