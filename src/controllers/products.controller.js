import { productService } from "../services/products.service.js";

class ProductsController {
    getAll = async (req, res) => {
        try {
            const { limit, sort, page, category, available } = req.query;
            const productsPaginated = await productService.getProducts({ limit, sort, page, category, available });

            const products = productsPaginated.docs;
            const currentPage = page ? page : 1;
            const totalPages = productsPaginated.totalPages;
            const limitLink = limit ? "&limit=" + limit : "";
            const sortLink = sort ? "&sort=" + sort : "";
            const categoryLink = category ? "&category=" + category : "";
            const availableLink = available ? "&available=" + available : "";
            const prevLink = productsPaginated.hasPrevPage ? "/products?page=" + productsPaginated.prevPage + limitLink + sortLink + categoryLink + availableLink : "";
            const nextLink = productsPaginated.hasNextPage ? "/products?page=" + productsPaginated.nextPage + limitLink + sortLink + categoryLink + availableLink : "";

            const categories = await productService.getCategories();

            const { firstName, email, role } = req.session.user ? req.session.user : "";

            if (productsPaginated.page > totalPages || (isNaN(page) && page != null)) {
                return res.status(404).render('error-products');
            }

            return res.status(201).render('products', { products, currentPage, totalPages, prevLink, nextLink, categories, firstName, email, role });

        } catch (error) {
            return res.status(500).render('error-products');
        }
    };
}

export const productsController = new ProductsController();