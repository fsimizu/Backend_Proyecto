import { ProductsMongooseModel } from "./mongoose/products.mongoose.js";
import { logger } from "../../utils/logger.js";

export default class ProductModel {

    async getProducts({ queryLimit, queryPage, sort, filter }) {
            return await ProductsMongooseModel.paginate(filter, {
                limit: queryLimit,
                page: queryPage,
                sort: { price: sort }
            })
    };

    async getProductById( { _id } ) {
        return await ProductsMongooseModel.findOne({ _id },
            {
                title: true,
                description: true,
                price: true,
                thumbnail: true,
                category: true,
                code: true,
                stock: true,
                status: true,
            }
        )
    }

    getCategories() {
        return ProductsMongooseModel.distinct('category');
    }

    async createProducts({ title, description, category, price, thumbnail, code, stock, status, email }) {
        try {
            const newProd = await ProductsMongooseModel.create({ title, description, category, price, thumbnail, code, stock, status, owner: email })
            return newProd
        } catch (e) {
            logger.error('Error creating the product ' + e);
            throw new Error(e);
        }
    }

    deleteProduct({ _id }) {
        return ProductsMongooseModel.deleteOne({_id: _id});
    }

    updateProduct ( { _id, title, description, price, thumbnail, code, stock, status } ) {
        return ProductsMongooseModel.updateOne(
            { _id: _id },
            { title, description, price, thumbnail, code, stock, status }
        );
    }

}

//   export const productModel = new ProductModel();
  