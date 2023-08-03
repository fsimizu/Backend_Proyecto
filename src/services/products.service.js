// import { productModel } from "../dao/mongo/products.model.js";
import { ProductModel } from '../dao/factory.js';

const productModel = new ProductModel()

class ProductService {
    async getProducts({ limit, sort, page, category, available }) {
        try {
            const queryLimit = limit ? limit : 10;
            const queryPage = page ? page : 1
            const filter = {};
            if (category) { filter.category = category }
            if (available) { filter.stock = { $gt: 0 } }

            const limitLink = limit ? "&limit=" + limit : "";
            const sortLink = sort ? "&sort=" + sort : "";
            const categoryLink = category ? "&category=" + category : "";
            const availableLink = available ? "&available=" + available : "";
            const productsPaginated = await productModel.getProducts({ queryLimit, queryPage, sort, filter });

            const prevLink = productsPaginated.hasPrevPage ? "/products?page=" + productsPaginated.prevPage + limitLink + sortLink + categoryLink + availableLink : "";
            const nextLink = productsPaginated.hasNextPage ? "/products?page=" + productsPaginated.nextPage + limitLink + sortLink + categoryLink + availableLink : "";
            productsPaginated.prevLink = prevLink;
            productsPaginated.nextLink = nextLink;

            return productsPaginated

        }
        catch (err) {
            throw new Error("Internal server error");
        }
    };

    async getProductById({ prodId }) {
        try {
            return await productModel.getProductById({ _id: prodId }
            )
        }
        catch (err) {
            throw new Error("Internal server error");
        }
    };

    async createProducts({title,description, price, thumbnail, code, stock, status}) {
        try {
            return await productModel.createProducts({title,description, price, thumbnail, code, stock, status})
        } catch (err) {
            throw new Error("Internal server error");
        }
    }

    async deleteProduct({prodId}) {
        try {
            return await productModel.deleteProduct({_id : prodId});
        } catch (err) {
            throw new Error("Internal server error");
        }
    }
    
    async updateProduct ( { _id, title, description, price, thumbnail, code, stock, status } ) {
        return await productModel.updateOne({ _id, title, description, price, thumbnail, code, stock, status }
        );
    }

    async getCategories() {
        try {
            return await productModel.getCategories();
        } catch (error) {
            console.error('Failed to retrieve categories:', error);
            throw error;
        }
    }

}

export const productService = new ProductService()