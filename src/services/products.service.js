import { productModel } from "../dao/models/products.model.js";

class ProductService {
    async getProducts({ limit, sort, page, category, available }) {

        try {
            const queryLimit = limit ? limit : 10;
            const queryPage = page ? page : 1
            const filter = {};

            if (category) { filter.category = category }
            if (available) { filter.stock = { $gt: 0 } }

            return await productModel.getProducts({ queryLimit, queryPage, sort, filter })
        }
        catch (err) {
            return res.status(500).json({ error: 'Internal server error' });
        }

    };

    async getProductById({ prodId }) {
        try {
            return await productModel.getProductById({ _id: prodId }
            )
        }
        catch (err) {
            return res.status(500).json({ err: 'Internal server error' });
        }
    };

    async createProducts({title,description, price, thumbnail, code, stock, status}) {
        try {
            return await productModel.createProducts({title,description, price, thumbnail, code, stock, status})
        } catch (err) {
            return res.status(500).json({ err: 'Internal server error' });
        }
    }

    async deleteProduct({prodId}) {
        try {
            return await productModel.deleteProduct({_id : prodId});
        } catch (err) {
            return res.status(500).json({ err: 'Internal server error' });
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