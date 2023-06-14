import { ProductModel } from "../dao/models/products.models.js";

class ProductService {
    async getProducts({queryLimit}) {
        try {
            if (queryLimit) {
                return await ProductModel.find({},
                    {
                        title: true, 
                        description: true, 
                        price: true,
                        thumbnail: true, 
                        code: true, 
                        stock: true,
                        status: true,
                      }
                ).limit(queryLimit);
            }
            else {
                return await ProductModel.find({},
                    {
                        title: true, 
                        description: true, 
                        price: true,
                        thumbnail: true, 
                        code: true, 
                        stock: true,
                        status: true,
                    }
                )}
        } 
        catch (err) {
            return res.status(500).json({ error: 'Internal server error' });
            }   
    };

    async getProductById({prodId}) {
        try {
            return await ProductModel.findOne({_id: prodId},
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
        catch (err) {
            return res.status(500).json({ err: 'Internal server error' });
            }   
    };

    async createProducts({title,description, price, thumbnail, code, stock, status}) {
        try {
            return await ProductModel.create({title,description, price, thumbnail, code, stock, status});
        } catch (err) {
            return res.status(500).json({ err: 'Internal server error' });
        }
    }

    async deleteProduct({prodId}) {
        try {
            return await ProductModel.deleteOne({_id : prodId});
        } catch (err) {
            return res.status(500).json({ err: 'Internal server error' });
        }
    }
    



    async updateProduct ( { _id, title, description, price, thumbnail, code, stock, status } ) {
        return await ProductModel.updateOne(
            { _id: _id },
            { title, description, price, thumbnail, code, stock, status }
        );
    }


}

export const productService = new ProductService()