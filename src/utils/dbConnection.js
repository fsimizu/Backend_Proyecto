import { connect } from "mongoose";
import { faker } from '@faker-js/faker';
import { ProductsMongooseModel } from "../dao/mongo/mongoose/products.mongoose.js";
import env from '../config/environment.config.js'
import { logger } from "./logger.js";

//aca falta singleton para que haya solo una conexion a la BBDDD.

export async function connectMongo() {
    try {
      await connect(
        env.mongoUrl,
        {
          dbName: "ecommerce"
        }
      );
      logger.info("plugged to mongo!")

      // (async () => {
      //   const products = [];
      //   for (let i = 0; i < 100; i++) {
      //     products.push({
      //       title: faker.commerce.productName(),
      //       description: faker.commerce.productDescription(),
      //       category: faker.commerce.department(),
      //       price: faker.commerce.price({ min: 1000, max: 10000 }),
      //       thumbnail: faker.image.urlLoremFlickr({ category: 'food' }),
      //       code: faker.string.uuid(),
      //       stock: faker.commerce.price({ min: 0, max: 20, dec: 0 }),
      //       status: true,
      //     });
      //   }
  
      //   try {
      //     await ProductsMongooseModel.insertMany(products);
      //     console.log('Inserted', products.length, 'products');

      //   } catch (error) {
      //     console.error('Error en insert many:', error);
      //   }
      // })();


    } catch (e) {
      logger.error(e)
      throw "cannot connect to the db";
    }
  }