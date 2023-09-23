import { productService } from "../services/products.service.js";
import { logger } from "../utils/logger.js";

class ProductsController {
    getAll = async (req, res) => {
        try {
            const { limit, sort, page = 1, category, available } = req.query;
            const { _id, firstName, email, role, cart, isAdmin } = req.session.user;
            const productsPaginated = await productService.getProducts({ limit, sort, page, category, available, email });
            const categories = await productService.getCategories();

            if (productsPaginated.page > productsPaginated.totalPages || (isNaN(page) && page != null)) {
                return res
                    .status(404)
                    .render('error', { code: 404, msg: "Page not found" });
            }

            return res
                .status(201)
                .render('products', {
                    products: productsPaginated.docs,
                    page,
                    totalPages: productsPaginated.totalPages,
                    prevLink: productsPaginated.prevLink,
                    nextLink: productsPaginated.nextLink,
                    categories,
                    _id,
                    firstName,
                    email,
                    role,
                    cart,
                    isAdmin,
                    canCreate: role === 'admin' || role === 'premium',
                });
        } catch (error) {
            return res
                .status(500)
                .render('error', { code: 500, msg: 'Internal server error' });
        }

    };


    addProduct = async (req, res) => {
        return res.status(200).render('product-new', {header: 'Create a new product'})
    };

    postOne = async (req, res) => {
        try {
            const { title, description, category, price, thumbnail, code, stock } = req.body;
            const { email } = req.session.user;
            
            if (!title || !description || !category || !price || !thumbnail || !code || !stock) {
                logger.warn("validation error: all fields are mandatory");
                return res.status(400).json({
                    status: "error",
                    msg: "please complete the required fields.",
                    payload: {},
                });
            }
            await productService.createProducts({ title, description, category, price, thumbnail, code, stock, email });
            
            return res.status(201).redirect("/products");

        } catch (e) {
            logger.error("Error calling the products service. " + e);
            return res.status(500).render( 'error', { code: 500, msg: "Failed creating the product" });
        }
    }

    getOne = async (req, res) => {
        const prodId = req.params.pid;
        const { title, description, code, category, price, stock, thumbnail } = await productService.getProductById({ prodId });

        return res.status(200).render('product-edit', {
            header: 'Edit a product',
            prodId, title, description, code, category, price, stock, thumbnail
        })
    };

    editOne = async (req, res) => {
        try {
            const prodId = req.params.pid;
            const { title, description, category, price, thumbnail, code, stock } = req.body;
            const updatedProduct = await productService.updateProduct({ _id: prodId, title, description, category, price, thumbnail, code, stock });

            if (updatedProduct.matchedCount) {
                return res.status(201).redirect('/products');
            }
            else {
                throw new Error ('Invalid product ID.')
            }

        } catch (e) {
            logger.error("Error in the controller when editing a product. " + e);
            return res.status(500).render('error', { code: 500, msg: e })
        }
    }

    addPhoto = async (req, res) => {
        try {
            const prodId = req.params.pid;
            return res.status(200).render('product-photo', {prodId})

        } catch (e) {
            logger.error("Error in the controller when editing a product. " + e);
            return res.status(500).render('error', { code: 500, msg: e })
        }
    }

    }



export const productsController = new ProductsController();