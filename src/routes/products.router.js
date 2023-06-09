import express from "express";
import { productService } from "../services/products.service.js";
export const productsRouter = express.Router();
import { isUser, isAdmin } from "../../middlewares/auth.js";

productsRouter.get('/', isUser, async (req, res) => {
  try{
    const { limit, sort, page, category, available } = req.query;
    
    const productsPaginated = await productService.getProducts({limit, sort, page, category, available});
    const products = productsPaginated.docs;
    const currentPage = page ? page : 1;
    const totalPages = productsPaginated.totalPages;    
    const limitLink = limit ? "&limit="+limit : "";
    const sortLink = sort ? "&sort="+sort : "";
    const categoryLink = category ? "&category="+category : "";
    const availableLink = available ? "&available="+available : "";
    const prevLink = productsPaginated.hasPrevPage ? "/products?page="+ productsPaginated.prevPage + limitLink + sortLink + categoryLink + availableLink : "";
    const nextLink = productsPaginated.hasNextPage ? "/products?page="+ productsPaginated.nextPage + limitLink + sortLink + categoryLink + availableLink : "";

    const categories = await productService.getCategories();

    //console.log(req.session.user); //devuelve undefined
    const {firstName, email, role } = req.session.user ? req.session.user : "";

    if ( productsPaginated.page > totalPages || (isNaN(page) && page != null) ) {
      return res.status(404).render('error-products');
    }

    return res.status(201).render('products', { products , currentPage, totalPages, prevLink , nextLink, categories, firstName, email, role});
  
  } catch (error) {
    return res.status(500).render('error-products');
  }
})
