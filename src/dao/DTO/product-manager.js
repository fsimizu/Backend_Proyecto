import * as fs from 'fs';
import { v4 as uuidv4 } from "uuid";
import { readProductsFile } from "../../functions/functions.js";


class ProductManager {
    constructor(path) {
        this.path = path
        const productsString = fs.readFileSync(this.path,"utf-8"); 
        this.products = JSON.parse(productsString);
    }

    async getProducts(req, res) {
        try {
            const queryLimit = req.query.limit;
            let prodList = await readProductsFile();
            let message = "Retrieved all products";

            if (queryLimit) {
                prodList = prodList.slice(0,queryLimit);
                message = "Retrieved limites results"
            }

            return res.status(201).json({
                status: "Success",
                msg: message,
                data: prodList});
        } 
        catch (err) {
            console.error(err);
            return res.status(500).json({ error: 'Internal server error' });
            }   
    };

    async getProductById(req, res) {
        try {
          const prodId = req.params.id;
          const prodList = await readProductsFile();
          const prodEncontrado = prodList.find(p=>p.id === prodId);
        
          if (prodEncontrado) {
            return res.status(201).json({
              status: "Success",
              msg: "The product with id " + prodId + " has been found",
              data: prodEncontrado});
              }
          else {
            return res.status(404).json({
              status: "Error",
              msg: "The id " + prodId + " does not exist",
              data: []});
        }
        } 
        catch (err) {
          console.error(err);
          return res.status(500).json({ error: 'Internal server error' });
        }
        };


    async deleteProduct(req, res) {
        try {
            const prodId = req.params.pid;
            let prodList = await readProductsFile();
            const prodFound = prodList.find(p=>p.id == prodId);
        
            if (prodFound) {
              fs.writeFileSync("./src/dao/db/products.json", JSON.stringify(prodList, null, 4));
              return res.status(201).json({
                status: "Success",
                msg: "The product with id " + prodId + " has been deleted.",
                deleted: prodFound});
                }
            else {
              return res.status(404).json({
                status: "Error",
                msg: "The id "+prodId+" does not exist",
                deleted: []});
          }
          } catch (err) {
              console.error(err);
              return res.status(500).json({ error: 'Internal server error' });
            }
        }

    async createProduct(req,res) {
        try {
            let prodList = await readProductsFile();        
            let newProduct = req.body;
            
            if (!newProduct.title || !newProduct.description || !newProduct.code || !newProduct.price || !newProduct.stock || !newProduct.category) {
              return res.status(404).json({
                status: "Error",
                msg: "All fields are mandatory",
                data: {      
                  "title": newProduct.title || "missing field",
                  "description": newProduct.description || "please complete this field",
                  "code": newProduct.code || "please complete this field",
                  "price": newProduct.price || "please complete this field",
                  "stock": newProduct.stock || "please complete this field",
                  "category": newProduct.category || "please complete this field"
                }
              });
            }
        
            let existing = false;
            prodList.forEach((item) =>{            
              item.code === newProduct.code && (existing = true)
            });
        
            if (existing) {
              return res.status(404).json({
                status: "Error",
                msg: "A product with the code specified already exists in the database"
              });
            }
        
            newProduct = {
              "id": uuidv4(),
              "title": newProduct.title,
              "description": newProduct.description,
              "code": newProduct.code,
              "price": newProduct.price,
              "status": true,
              "stock": newProduct.stock,
              "category": newProduct.category,
              "thumbnail": newProduct.thumbnail
            }
            prodList.push(newProduct);
            fs.writeFileSync("./src/dao/db/products.json", JSON.stringify(prodList, null, 4))
        
            return res.status(201).json({
              status: "Success",
              msg: "Product posted",
              productPosted: newProduct
            });    
          } catch (err) {
              console.error(err);
              return res.status(500).json({ error: 'Internal server error' });
            }
    };

    async editProduct(req,res) {
        try {
            const prodId = req.params.pid;
            let prodList = await readProductsFile();
            const prodFoundIndex = prodList.findIndex(p=>p.id == prodId);
            const prodFound = prodList.find(p=>p.id == prodId);
            let newProduct = req.body;
            
            if (newProduct.id) {
              return res.status(404).json({
                status: "Error",
                msg: "The body cannot include an id",
                deleted: []});
            }
        
            if (prodFound) {
              prodList[prodFoundIndex] = {
                ...prodFound,
                ...newProduct
              }
              fs.writeFileSync("./src/dao/db/products.json", JSON.stringify(prodList, null, 4));
        
              return res.status(201).json({
                status: "Success",
                msg: "The product with id " + prodId + " has been modified.",
                deleted: prodList[prodFoundIndex]});
                }
        
            else {
              return res.status(404).json({
                status: "Error",
                msg: "The product with id "+prodId+" does not exist",
                deleted: []});
          }
          } catch (err) {
              console.error(err);
              return res.status(500).json({ error: 'Internal server error' });
            }
    }
    
}

export default ProductManager