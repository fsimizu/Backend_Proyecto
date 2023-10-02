import config from '../config/environment.config.js';
import MongoSingleton from '../utils/mongoSingleton.js';
import { logger } from '../utils/logger.js';

export let ProductModel;
export let CartModel;
export let TicketModel;
export let UserModel;
export let MessageModel;
export let TokenModel;

switch (config.persistence) {
  case 'MONGO':
    logger.info('Persistence with Mongo');
    
    MongoSingleton.getInstance()
    const { default: ProductsMongo } = await import('./mongo/products.model.js');
    ProductModel = ProductsMongo;
    const { default: CartsMongo } = await import('./mongo/carts.model.js');
    CartModel = CartsMongo;
    const { default: TicketsMongo } = await import('./mongo/tickets.model.js');
    TicketModel = TicketsMongo;
    const { default: UsersMongo } = await import('./mongo/users.model.js');
    UserModel = UsersMongo;
    const { default: MessageMongo } = await import('./mongo/messages.model.js');
    MessageModel = MessageMongo;
    const { default: TokenMongo } = await import('./mongo/token.model.js');
    TokenModel = TokenMongo;

    break;
    
  case 'MEMORY':
    logger.info('Persistence with Memory');
    // const { default: ContactsMemory } = await import('./memory/contacts.memory.js');
    // Contacts = ContactsMemory;

    break;
  default:
    break;
}