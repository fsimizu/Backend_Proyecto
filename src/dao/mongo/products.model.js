import { ProductsMongooseModel } from "./mongoose/products.mongoose.js";

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
                code: true,
                stock: true,
                status: true,
            }
        )
    }

    getCategories() {
        return ProductsMongooseModel.distinct('category');
    }

    createProducts({title,description, price, thumbnail, code, stock, status}) {
        return ProductsMongooseModel.create({title,description, price, thumbnail, code, stock, status});
    }

    deleteProduct({prodId}) {
        return ProductsMongooseModel.deleteOne({_id : prodId});
    }

    updateProduct ( { _id, title, description, price, thumbnail, code, stock, status } ) {
        return ProductsMongooseModel.updateOne(
            { _id: _id },
            { title, description, price, thumbnail, code, stock, status }
        );
    }

}

//   export const productModel = new ProductModel();
  