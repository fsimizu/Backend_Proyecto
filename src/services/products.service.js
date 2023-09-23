// import { productModel } from "../dao/mongo/products.model.js";
import { ProductModel } from '../dao/factory.js';
import { logger } from "../utils/logger.js";

const productModel = new ProductModel()

class ProductService {
    async getProducts({ limit, sort, page, category, available, email }) {
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

            productsPaginated.docs.forEach(obj => {
                if (obj.owner === email) {
                    obj.isOwnProduct = true
                }
                else {
                    obj.isOwnProduct = false
                }
            });

            return productsPaginated

        }
        catch (err) {
            throw new Error("Internal server error");
        }
    };

    async getProductById({ prodId }) {
        try {
            return await productModel.getProductById({ _id: prodId });
        }
        catch (err) {
            logger.error('Error in the product service. ' + err);
            throw new Error('Error in the product service. ' + err);
        }
    };

    async createProducts({ title, description, category, price, thumbnail, code, stock, email }) {
        try {
            const status = stock > 0 ? true : false;
            return await productModel.createProducts({ title, description, category, price, thumbnail, code, stock, status, email })
        } catch (e) {
            logger.error('Error calling the product model. ' + e);
            throw new Error(e);
        }
    }

    async deleteProduct({ prodId }) {
        try {
            return await productModel.deleteProduct({ _id: prodId });
        } catch (e) {
            throw new Error("Internal server error." + e);
        }
    }

    async updateProduct({ _id, title, description, category, price, thumbnail, code, stock }) {
        try {
            const status = stock > 0 ? true : false;
            return await productModel.updateProduct({ _id, title, description, category, price, thumbnail, code, stock, status })
        } catch (e) {
            logger.error("Error in the service in the updateProduct function. " + e);
            throw new Error(e);
        }

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