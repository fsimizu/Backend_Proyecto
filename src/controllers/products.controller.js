import { productService } from "../services/products.service.js";

class ProductsController {
    getAll = async (req, res) => {
        try {
            const { limit, sort, page = 1, category, available } = req.query;
        const { firstName, email, role, cart } = req.session.user;
        const productsPaginated = await productService.getProducts({ limit, sort, page, category, available });
        const categories = await productService.getCategories();

        if (productsPaginated.page > productsPaginated.totalPages || (isNaN(page) && page != null)) {
            return res
                .status(404)
                .render('error', { code: 404, msg: "Page not found" });
        }

        return res
            .status(201)
            .render('products', { products: productsPaginated.docs, page, totalPages: productsPaginated.totalPages, prevLink: productsPaginated.prevLink, nextLink: productsPaginated.nextLink, categories, firstName, email, role, cart });
        } catch (error) {
            return res
            .status(500)
            .render('error', { code: 500, msg: 'Internal server error' });
        }
        
    };
}
    //un admin deberia poder crear un producto.
    //agregar un metodo para crear.
    //agregar un DTO para normalizar datos
    
export const productsController = new ProductsController();