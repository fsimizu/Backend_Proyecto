import { connect } from "mongoose";
import { faker } from '@faker-js/faker';
import { ProductModel } from "../dao/models/products.models.js";


export async function connectMongo() {
    try {
      await connect(
        "mongodb+srv://fersimizu:ZogB7pClZEtkTnny@backend.yutifmg.mongodb.net/?retryWrites=true&w=majority",
        {
          dbName: "ecommerce"
        }
      );
      console.log("plugged to mongo!");

      // (async () => {
      //   const products = [];
      //   for (let i = 0; i < 10; i++) {
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
      //     await ProductModel.insertMany(products);
      //     console.log('Inserted', products.length, 'users');

      //   } catch (error) {
      //     console.error('Error en insert many:', error);
      //   }
      // })();


    } catch (e) {
      console.log(e);
      throw "cannot connect to the db";
    }
  }