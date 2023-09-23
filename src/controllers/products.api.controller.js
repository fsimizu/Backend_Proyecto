import CustomError from "../services/errors/custom-error.js";
import EErros from "../services/errors/enums.js";
import { productService } from "../services/products.service.js";
import { logger } from "../utils/logger.js";

class ProductsApiController {
    getAll = async (req, res) => {

        try {
            const { limit, sort, page, category, available } = req.query;
            const products = await productService.getProducts({ limit, sort, page, category, available });
            const limitLink = limit ? "&limit=" + limit : "";
            const sortLink = sort ? "&sort=" + sort : "";
            const categoryLink = category ? "&category=" + category : "";
            const availableLink = available ? "&available=" + available : "";
            const prevLink = products.hasPrevPage ? "/api/products?page=" + products.prevPage + limitLink + sortLink + categoryLink + availableLink : "";
            const nextLink = products.hasNextPage ? "/api/products?page=" + products.nextPage + limitLink + sortLink + categoryLink + availableLink : "";

            if (products.page > products.totalPages) {

                CustomError.createError({
                    name: "Page not found",
                    cause: "The page in the param is greater than the total number of pages",
                    message: "The page requested does not exist",
                    code: EErros.INVALID_TYPES_ERROR,
                });

                // return res.status(404).json({
                //     status: "error",
                //     msg: "Page not found",
                //     payload: {},
                //     });
            }

            return res.status(200).json({
                status: "success",
                message: "list of products",
                payload: products.docs,
                totalPages: products.totalPages,
                prevPage: products.prevPage,
                nextPage: products.nextPage,
                page: products.page,
                hasPrevPage: products.hasPrevPage,
                hasNextPage: products.hasNextPage,
                prevLink: prevLink,
                nextLink: nextLink,

            });

        } catch (e) {
            req.logger.error(e);
            return res.status(500).json({
                status: "error",
                errorCode: e.code,
                errorName: e.name,
                errorMessage: e.message,
                errorCause: e.cause,
            });
        }
    }

    getOne = async (req, res) => {
        try {
            const prodId = req.params.pid;
            const searchedProducts = await productService.getProductById({ prodId });

            return res.status(200).json({
                status: "success",
                msg: "Product found",
                payload: searchedProducts
            });

        } catch (e) {
            req.logger.error(e);
            return res.status(500).json({
                status: "error",
                msg: "something went wrong :(",
                payload: {},
            });
        }
    }

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
            const prodCreated = await productService.createProducts({ title, description, category, price, thumbnail, code, stock, email });

            return res.status(201).json({
                status: "Success",
                msg: "Product created",
                payload: {
                    _id: prodCreated._id,
                    title: prodCreated.title,
                    description: prodCreated.description,
                    category: prodCreated.category,
                    price: prodCreated.price,
                    thumbnail: prodCreated.thumbnail,
                    code: prodCreated.code,
                    stock: prodCreated.stock,
                    owner: email
                }
            });
        } catch (e) {
            logger.error("Error calling the products service. " + e);
            return res.status(500).json({
                status: "error",
                msg: "something went wrong :(",
                payload: {},
            });
        }
    }

    deleteOne = async (req, res) => {
        try {
            const prodId = req.params.pid;
            await productService.deleteProduct({ prodId });

            return res.status(200).json({
                status: "Success",
                msg: "Product deleted",
                payload: {}
            });

        } catch (error) {
            logger.error(error);
            return res.status(500).json({
                status: "error",
                msg: "something went wrong :(",
                payload: {},
            });
        }
    };

    editOne = async (req, res) => {
        try {
            const prodId = req.params.pid;
            const { title, description, category, price, thumbnail, code, stock } = req.body;
            const updatedProduct = await productService.updateProduct({ _id: prodId, title, description, category, price, thumbnail, code, stock });

            if (updatedProduct.matchedCount) {
                return res.status(201).json({
                    status: "success",
                    msg: "Product updated",
                    payload: {
                        _id: prodId,
                        modified: [{ title, description, category, price, thumbnail, code, stock }]
                    }
                });
            }

        } catch (error) {
            req.logger.error(e);
            return res.status(500).json({
                status: "error",
                msg: "something went wrong :(",
                payload: {},
            });
        }
    }

    uploadPhoto = async (req, res) => {
        try {
            const prodId = req.params.pid;
            const searchedProducts = await productService.getProductById({ prodId });

            if (!req.files) {
                return res.status(400).json({
                    status: "Error",
                    msg: "No file uploaded",
                    payload: {},
                });
            }

            if (!searchedProducts) {
                return res.status(400).json({
                    status: "Error",
                    msg: "Incorrect product ID",
                    payload: {},
                });
            }

            return res.status(200).json({
                status: "Success",
                msg: "Photo updated",
                payload: {},
            });
        } catch (e) {
            logger.error(e);
            return res.status(500).json({
                status: "Error",
                msg: "Something went wrong :(" + e,
                payload: {},
            });
        }

    }

}



export const productsApiController = new ProductsApiController();