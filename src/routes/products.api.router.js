import express from "express";
import { productService } from "../services/products.service.js";
export const productsApiRouter = express.Router();

productsApiRouter.get('/', async (req, res) => {
  try{
    const { limit, sort, page, category, available } = req.query;
    
    const products = await productService.getProducts({limit, sort, page, category, available});
    
    const limitLink = limit ? "&limit="+limit : "";
    const sortLink = sort ? "&sort="+sort : "";
    const categoryLink = category ? "&category="+category : "";
    const availableLink = available ? "&available="+available : "";

    const prevLink = products.hasPrevPage ? "/api/products?page="+ products.prevPage + limitLink + sortLink + categoryLink + availableLink : "";
    const nextLink = products.hasNextPage ? "/api/products?page="+ products.nextPage + limitLink + sortLink + categoryLink + availableLink : "";

    if ( products.page > products.totalPages) {
      return res.status(404).json({
        status: "error",
        msg: "Page not found",
        payload: {},
      });
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
      return res.status(500).json({
        status: "error",
        msg: "something went wrong :(",
        payload: {},
      });
  }
})

productsApiRouter.get('/:pid', async (req, res) => {
  try {
    const prodId = req.params.pid;
    const searchedProducts = await productService.getProductById({prodId});

    return res.status(200).json({
      status: "success",
      msg: "Product found",
      payload: searchedProducts
    });

  } catch (error) {
    return res.status(500).json({
      status: "error",
      msg: "something went wrong :(",
      payload: {},
    });
  }
})

productsApiRouter.post('/', async (req, res) => {
  try {    
    const {title, description, price, thumbnail, code, stock, status} = req.body;
    if (!title || !description || !price || !thumbnail || !code || !stock || !status) {
      console.log( "validation error: all fields are mandatory");
      return res.status(400).json({
        status: "error",
        msg: "please complete the required fields.",
        payload: {},
      });
  }
    const prodCreated = await productService.createProducts({title, description, price, thumbnail, code, stock, status});
    return res.status(201).json({
        status: "success",
        msg: "product created",
        payload: {
          _id: prodCreated._id,
          title: prodCreated.title,
          description: prodCreated.description,
          price: prodCreated.price,
          thumbnail: prodCreated.thumbnail,
          code: prodCreated.code,
          stock: prodCreated.stock,
          stock: prodCreated.stock
        }
    });    
  } catch (e) {
      return res.status(500).json({
        status: "error",
        msg: "something went wrong :(",
        payload: {},
      });
  }
});

productsApiRouter.delete('/:pid', async (req, res) => {
  try {
    const prodId = req.params.pid;
    await productService.deleteProduct({prodId});

    return res.status(200).json({
      status: "success",
      msg: "Product deleted",
      payload: {}
    });

  } catch (error) {
    return res.status(500).json({
      status: "error",
      msg: "something went wrong :(",
      payload: {},
    });
  }
});

productsApiRouter.put('/:pid', async (req, res) => {
  try {
    const prodId = req.params.pid;
    const { title, description, price, thumbnail, code, stock, status } = req.body;
    const updatedProduct = await productService.updateProduct({ _id: prodId, title, description, price, thumbnail, code, stock, status });
        
    if (updatedProduct.matchedCount){
      return res.status(201).json({
        status: "success",
        msg: "user updated",
        payload: { 
          _id: prodId, 
          modified: [{title, description, price, thumbnail, code, stock, status}]
          }      
      });
    }
      
  } catch (error) {
    return res.status(500).json({
      status: "error",
      msg: "something went wrong :(",
      payload: {},
    });
  } 
});